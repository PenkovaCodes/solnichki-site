import { NextRequest, NextResponse } from 'next/server';

// TODO: Integrate Cloudinary
// For now, this is a placeholder that returns a fake URL
// Real implementation should upload to Cloudinary and return secure_url

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Не е качен файл' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Невалиден тип файл. Разрешени: JPG, PNG, HEIC, WebP.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Файлът е твърде голям. Максимум 10MB.' },
        { status: 400 }
      );
    }

    // PLACEHOLDER: Return mock URL
    // TODO: Implement actual Cloudinary upload here
    const mockUrl = `https://res.cloudinary.com/placeholder/image/upload/${Date.now()}_${file.name}`;

    return NextResponse.json({
      url: mockUrl,
      filename: file.name,
      size: file.size,
      message: 'Image URL generated (Cloudinary not yet integrated)',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Грешка при качване на файла' },
      { status: 500 }
    );
  }
}
