export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-flax/5 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-serif font-semibold text-astronaut-blue mb-8">
          Политика за поверителност
        </h1>

        <section className="space-y-6 text-charcoal leading-relaxed">
          <p className="text-sm text-gray-500">
            Последно актуализирано: Април 2026
          </p>

          <h2 className="text-2xl font-serif text-astronaut-blue mt-8">1. Събирането на данни</h2>
          <p>
            Когато направите поръчка, събираме следната информация: име, адрес, имейл, телефон,
            и персонализиращи данни (снимки,description на облекло, допълнителни бележки).
            Използваме тази информация само за да изпълним поръчката ви.
          </p>

          <h2 className="text-2xl font-serif text-astronaut-blue mt-8">2. Платения</h2>
          <p>
            Плащанията се обработват чрез Stripe. Пълните данни на картата не са съхранени на нашите сървъри.
            Stripe има тяхна политика за поверителност, която можете да прочетете на stripe.com.
          </p>

          <h2 className="text-2xl font-serif text-astronaut-blue mt-8">3. Използване на данните</h2>
          <p>
            Вашите данни се използват единствено за:
          </p>
          <ul className="list-disc pl-6 space-y-2 ml-4">
            <li>Изпълнение на поръчката (доставка, контакт за потвърждение)</li>
            <li>Обслужване на клиенти (отговор на въпроси)</li>
            <li>Подобряване на нашите продукти и услуги</li>
          </ul>

          <h2 className="text-2xl font-serif text-astronaut-blue mt-8">4. Споделяне на данни</h2>
          <p>
            Не продаваме, не търгуваме и не-spam вашите лични данни. Може да споделим информация с трети страни само когато е необходимо за доставка (куrier services) или за обработка на плащания (Stripe).
          </p>

          <h2 className="text-2xl font-serif text-astronaut-blue mt-8">5. Съхранение на данни</h2>
          <p>
            Запазваме поръчкови данни за период от 5 години за финансови и законови цели.
            След това периодично изтриваме личната информация.
          </p>

          <h2 className="text-2xl font-serif text-astronaut-blue mt-8">6. Вашите права</h2>
          <p>
            Имате право да:
          </p>
          <ul className="list-disc pl-6 space-y-2 ml-4">
            <li>Погледнете кои данни съхраняваме за вас</li>
            <li>Изискате коригиране на неточности</li>
            <li>Изискате изтриване на вашите лични данни</li>
            <li>Възразите срещу обработката</li>
          </ul>
          <p>
            За да упражните тези права, изпратете имейл на solnichki@gmail.com.
          </p>

          <h2 className="text-2xl font-serif text-astronaut-blue mt-8">7. Безопасност</h2>
          <p>
            Предприемаме разумни мерки за защита на вашите данни, включително:
            HTTPS/TLS за шифриране на трафика, сигурни сървъри, и ограничен достъп до лични данни.
          </p>

          <h2 className="text-2xl font-serif text-astronaut-blue mt-8">8. Промени в политиката</h2>
          <p>
            Можем да актуализираме тази политика от време на време. Новата версия винаги е публикувана на този сайт.
          </p>

          <h2 className="text-2xl font-serif text-astronaut-blue mt-8">9. Контакт</h2>
          <p>
            Въпроси за поверителността? Изпратете ни имейл на solnichki@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
