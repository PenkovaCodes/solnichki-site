'use client';

import { useEffect, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
);

type Option = {
  id: number;
  label: string;
  price: string;
  priceInCents: number;
};

const options: Option[] = [
  { id: 1, label: '1 персонализирана солничка', price: '46,00 €', priceInCents: 4600 },
  { id: 2, label: '2 персонални солнички (сол и пипер)', price: '89,99 €', priceInCents: 8999 },
  { id: 3, label: '3 персонализирани солнички', price: '135,99 €', priceInCents: 13599 },
  { id: 4, label: '4 персонализирани солнички', price: '184,99 €', priceInCents: 18499 },
];

const countries = [
  'България', 'Румъния', 'Сърбия', 'Гърция', 'Турция', 'Германия', 'Франция', 'Италия', 'Испания', 'Австрия', 'Останали',
];

function CheckoutFormInner({ selectedOption, onUploadProgress }: { selectedOption: number; onUploadProgress?: (msg: string) => void }) {
  const stripe = useStripe();
  const elements = useElements();

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const postalRef = useRef<HTMLInputElement>(null);
  const courierNoteRef = useRef<HTMLTextAreaElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  // File refs will be stored in an array
  const personPhotoRefs = useRef<(HTMLInputElement | null)[]>([]);
  const clothingUploadRefs = useRef<(HTMLInputElement | null)[]>([]);
  const clothingDescRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const featuresRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const additionalNotesRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});

  const handleOptionChange = (id: number) => {
    window.location.search = `?option=${id}`;
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        // Fallback: use blob URL if Cloudinary not configured or upload failed
        const fallbackUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : '/images/placeholder.png';
        uploadedUrls.push(fallbackUrl);
        continue;
      }

      const data = await res.json();
      uploadedUrls.push(data.url);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!termsRef.current?.checked) {
      setErrorMessage('Моля, съглатете се с условията и политиката за поверителност.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Collect shipping data
      const shipping = {
        fullName: nameRef.current?.value || '',
        phone: phoneRef.current?.value || '',
        email: emailRef.current?.value || '',
        country: countryRef.current?.value || '',
        address: addressRef.current?.value || '',
        city: cityRef.current?.value || '',
        postalCode: postalRef.current?.value || '',
        courierNote: courierNoteRef.current?.value,
      };

      // Validate required shipping fields
      if (!shipping.fullName || !shipping.phone || !shipping.email || !shipping.country || !shipping.address || !shipping.city || !shipping.postalCode) {
        throw new Error('Моля, попълнете всички задължителни полете за доставка.');
      }

      // Collect customizations + upload photos
      const customizations: Array<{
        photoUrl?: string;
        features: string;
        clothingChoice: 'upload' | 'describe';
        clothingPhotoUrl?: string;
        clothingDescription?: string;
        additionalNotes?: string;
      }> = [];

      const personFiles: File[] = [];
      const clothingFiles: File[] = [];

      for (let idx = 0; idx < selectedOption; idx++) {
        const features = featuresRefs.current[idx]?.value || '';
        if (!features.trim()) throw new Error(`Моля, опишете отличителни белези за солничка ${idx + 1}.`);

        const personInput = personPhotoRefs.current[idx] as HTMLInputElement;
        const personFile = personInput?.files?.[0];
        if (!personFile) throw new Error(`Моля, качете снимка на човека за солничка ${idx + 1}.`);
        personFiles.push(personFile);

        const clothingChoice = (document.querySelector(`input[name="clothing-${idx}"]:checked`) as HTMLInputElement)?.value as 'upload' | 'describe';
        let clothingPhotoUrl: string | undefined;
        let clothingDescription: string | undefined;

        if (clothingChoice === 'upload') {
          const clothingInput = clothingUploadRefs.current[idx] as HTMLInputElement;
          const clothingFile = clothingInput?.files?.[0];
          if (!clothingFile) throw new Error(`Моля, качете снимка на облеклото за солничка ${idx + 1}.`);
          clothingFiles.push(clothingFile);
        } else {
          clothingDescription = clothingDescRefs.current[idx]?.value || '';
          if (!clothingDescription?.trim()) throw new Error(`Моля, опишете облеклото за солничка ${idx + 1}.`);
        }

        const additionalNotes = additionalNotesRefs.current[idx]?.value;

        customizations.push({ features, clothingChoice, clothingPhotoUrl, clothingDescription, additionalNotes });
      }

      // Upload all images
      if (onUploadProgress) onUploadProgress('Качване на снимки...');
      const [personUrls, clothingUrls] = await Promise.all([
        uploadFiles(personFiles),
        clothingFiles.length > 0 ? uploadFiles(clothingFiles) : Promise.resolve([]),
      ]);

      // Assign URLs to customizations
      let clothingIdx = 0;
      customizations.forEach((c, idx) => {
        if (c.clothingChoice === 'upload') {
          c.clothingPhotoUrl = clothingUrls[clothingIdx++];
        }
        c.photoUrl = personUrls[idx];
      });

      // Create PaymentIntent with full order metadata
      if (onUploadProgress) onUploadProgress('Създаване на поръчка...');

      const selected = options.find((o) => o.id === selectedOption);
      const amount = selected?.priceInCents || 4600;

      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          option: selectedOption,
          amount,
          shipping,
          customizations,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Грешка при създаване на плащане');
      }

      const { clientSecret } = await res.json();

      // Confirm payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/blagodarim`,
          receipt_email: shipping.email,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Грешка при плащане');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Възникна грешка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Option selection */}
      <section>
        <h3 className="font-serif text-2xl text-astronaut-blue mb-6">Избери опция</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {options.map((opt) => (
            <label
              key={opt.id}
              className={`relative flex flex-col p-5 rounded-lg border cursor-pointer transition-all ${
                selectedOption === opt.id ? 'bg-deep-cerulean text-white border-deep-cerulean' : 'bg-white border-astronaut-blue/15 hover:border-deep-cerulean/40'
              }`}
            >
              <input
                type="radio"
                name="option"
                value={opt.id}
                checked={selectedOption === opt.id}
                onChange={() => handleOptionChange(opt.id)}
                className="sr-only"
              />
              <span className="font-serif text-2xl font-semibold mb-2">{opt.price}</span>
              <span className="text-sm">{opt.label}</span>
              {selectedOption === opt.id && (
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-white bg-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* Personalization */}
      <section>
        <h3 className="font-serif text-2xl text-astronaut-blue mb-6">
          Персонализация {selectedOption > 1 && `(${selectedOption} солнички)`}
        </h3>
        <div className="space-y-8">
          {Array.from({ length: selectedOption }).map((_, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-flax/10 border border-astronaut-blue/10">
              <h4 className="font-serif text-xl text-deep-cerulean mb-6">Солничка #{idx + 1}</h4>

              {/* Person photo */}
              <div className="mb-6">
                <label className="block font-medium text-sm mb-2">Снимка на човека *</label>
                <div className="border-2 border-dashed border-astronaut-blue/30 rounded-lg p-6 text-center hover:border-deep-cerulean/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    ref={(el) => { personPhotoRefs.current[idx] = el; }}
                    className="w-full text-sm text-astronaut-blue/70 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-deep-cerulean file:text-white hover:file:bg-astronaut-blue"
                  />
                  <p className="text-xs text-astronaut-blue/50 mt-2">Приема: JPG, PNG, HEIC. Максимум 10MB.</p>
                </div>
              </div>

              {/* Distinctive features */}
              <div className="mb-6">
                <label className="block font-medium text-sm mb-2">Описание на отличителните белези *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Пример: Дълга кестенява коса до раменете, кафяви очи, лек тен."
                  className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue"
                  ref={(el) => { featuresRefs.current[idx] = el; }}
                />
              </div>

              {/* Clothing choice */}
              <div className="mb-6">
                <label className="block font-medium text-sm mb-3">Облекло *</label>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`clothing-${idx}`} value="upload" defaultChecked className="accent-deep-cerulean" />
                    <span className="text-sm">Качвам снимка на облеклото</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`clothing-${idx}`} value="describe" className="accent-deep-cerulean" />
                    <span className="text-sm">Описвам с думи</span>
                  </label>
                </div>

                {/* Upload clothing */}
                <div className="border-2 border-dashed border-astronaut-blue/30 rounded-lg p-4 text-center mb-4 hover:border-deep-cerulean/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    ref={(el) => { clothingUploadRefs.current[idx] = el; }}
                    className="w-full text-sm text-astronaut-blue/70 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-deep-cerulean file:text-white hover:file:bg-astronaut-blue"
                  />
                </div>

                {/* Describe clothing */}
                <div>
                  <textarea
                    rows={3}
                    placeholder="Пример: Бяла риза с яка, тъмносини джинси, червени маратонки."
                    className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue"
                    ref={(el) => { clothingDescRefs.current[idx] = el; }}
                  />
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block font-medium text-sm mb-2">Допълнителни бележки (по желание)</label>
                <textarea
                  rows={2}
                  placeholder="Например: повод за подаръка, име на човека, специален детайл."
                  className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue"
                  ref={(el) => { additionalNotesRefs.current[idx] = el; }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery */}
      <section className="space-y-6">
        <h3 className="font-serif text-2xl text-astronaut-blue mb-6">Доставка</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-sm mb-2">Име и фамилия *</label>
            <input type="text" id="name" required ref={nameRef} className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue" />
          </div>
          <div>
            <label className="block font-medium text-sm mb-2">Телефон *</label>
            <input type="tel" id="phone" required ref={phoneRef} className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium text-sm mb-2">Имейл *</label>
            <input type="email" id="email" required ref={emailRef} className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue" />
          </div>
          <div>
            <label className="block font-medium text-sm mb-2">Държава *</label>
            <select id="country" required ref={countryRef} className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue bg-white">
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-sm mb-2">Град *</label>
            <input type="text" id="city" required ref={cityRef} className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue" />
          </div>
          <div>
            <label className="block font-medium text-sm mb-2">Адрес (улица, номер) *</label>
            <input type="text" id="address" required ref={addressRef} className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue" />
          </div>
          <div>
            <label className="block font-medium text-sm mb-2">Пощенски код *</label>
            <input type="text" id="postal" required ref={postalRef} className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium text-sm mb-2">Бележка към куриера (по желание)</label>
            <textarea id="note" rows={2} ref={courierNoteRef} className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue" />
          </div>
        </div>
      </section>

      {/* Payment */}
      <section>
        <h3 className="font-serif text-2xl text-astronaut-blue mb-6">Плащане</h3>
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-sm mb-2">Име на картата</label>
            <input type="text" placeholder="Както е написано на картата" className="w-full p-3 border border-astronaut-blue/20 rounded focus:outline-none focus:ring-2 focus:ring-deep-cerulean/50 text-astronaut-blue" />
          </div>
          <div className="p-6 border border-astronaut-blue/10 rounded-lg bg-flax/5">
            <PaymentElement options={{ layout: 'tabs', fields: { billingDetails: 'never' } }} />
          </div>
        </div>
      </section>

      {/* Summary & Submit */}
      <section className="pt-8 border-t border-astronaut-blue/10">
        <div className="bg-flax/10 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Сума ({selectedOption} солнички):</span>
            <span className="font-serif text-2xl font-semibold text-deep-cerulean">{options.find(o => o.id === selectedOption)?.price}</span>
          </div>
          <div className="flex justify-between text-sm text-astronaut-blue/60 mb-4">
            <span>Доставка:</span>
            <span>Ще се изчисли след поръчка</span>
          </div>
          <div className="border-t border-astronaut-blue/15 pt-4 flex justify-between items-center">
            <span className="font-serif text-xl font-semibold">Общо:</span>
            <span className="font-serif text-3xl font-bold text-deep-cerulean">{options.find(o => o.id === selectedOption)?.price}</span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{errorMessage}</div>
        )}

        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full py-5 bg-deep-cerulean text-white font-medium uppercase tracking-wider text-lg rounded hover:bg-astronaut-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Обработка...' : `Плати ${options.find(o => o.id === selectedOption)?.price}`}
        </button>

        <p className="mt-4 text-xs text-center text-astronaut-blue/50 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Защитено SSL плащане. Данните ви са защитени.
        </p>

        <p className="mt-3 text-xs text-center">
          <label className="flex items-center justify-center gap-2 cursor-pointer">
            <input type="checkbox" required ref={termsRef} className="accent-deep-cerulean" />
            <span>Запознат/а съм с </span>
            <a href="/terms" className="underline hover:text-deep-cerulean">условията</a>
            <span>и </span>
            <a href="/privacy" className="underline hover:text-deep-cerulean">политиката за поверителност</a>
          </label>
        </p>
      </section>
    </form>
  );
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number>(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const option = params.get('option');
    if (option && !isNaN(Number(option))) {
      const id = Number(option);
      if (id >= 1 && id <= 4) setSelectedOption(id);
    }
  }, []);

  useEffect(() => {
    async function createPaymentIntent() {
      const priceMap: Record<number, number> = { 1: 4600, 2: 8999, 3: 13599, 4: 18499 };
      const amount = priceMap[selectedOption] || 4600;

      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ option: selectedOption, amount, currency: 'eur' }),
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('Failed to get clientSecret:', data);
        }
      } catch (err) {
        console.error('Failed to create PaymentIntent:', err);
      }
    }
    createPaymentIntent();
  }, [selectedOption]);

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-deep-cerulean border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-astronaut-blue">Зареждане...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm text-astronaut-blue/60 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Защитено плащане
            </div>
            <h1 className="font-serif text-section text-astronaut-blue mb-2">Поръчай своята солничка</h1>
            <p className="text-body-desktop text-astronaut-blue/70">Изработка до 6 работни дни след плащане.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutFormInner selectedOption={selectedOption} />
              </Elements>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-flax/10 rounded-lg p-6 border border-astronaut-blue/10">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <img src="/images/product-1.png" alt="Солничка" className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-serif text-xl text-astronaut-blue mb-2">{options.find(o => o.id === selectedOption)?.label}</h4>
                  <p className="text-2xl font-bold text-deep-cerulean">{options.find(o => o.id === selectedOption)?.price}</p>
                </div>
                <hr className="border-astronaut-blue/10 mb-4" />
                <p className="text-sm text-astronaut-blue/70">Срок за изработка: <strong className="text-astronaut-blue">До 6 работни дни</strong></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
