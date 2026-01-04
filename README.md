This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Hướng dẫn Setup Jest trong Next.js 16

### Bước 1: Cài đặt các thư viện cần thiết

Mở terminal và chạy lệnh sau để cài đặt Jest, môi trường DOM và các công cụ hỗ trợ TypeScript:

```bash
npm install --save-dev jest jest-environment-jsdom ts-jest ts-node @testing-library/react @testing-library/jest-dom @testing-library/dom @types/jest
```

**Giải thích các thư viện:**
* **jest**: Bộ máy chạy test chính.
* **jest-environment-jsdom**: Giả lập môi trường trình duyệt (DOM) để React có thể render.
* **ts-jest & ts-node**: Giúp Jest hiểu và chạy được các file cấu hình bằng `.ts`.
* **@testing-library/react**: Thư viện chính để render component và tương tác (click, type...).
* **@testing-library/jest-dom**: Cung cấp các lệnh kiểm tra như `.toBeInTheDocument()`.
* **@types/jest**: Hỗ trợ gợi ý code (Intellisense) cho Jest trong VS Code.

### Bước 2: Tạo file `jest.config.ts` tại thư mục gốc
Dán đoạn code sau vào file:

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Cung cấp đường dẫn đến ứng dụng Next.js để load next.config.js và file .env
  dir: './',
})

// Cấu hình tùy chỉnh cho Jest
const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
}

// createJestConfig được xuất ra theo cách này để đảm bảo next/jest có thể load cấu hình async
export default createJestConfig(config)
```

### Bước 3: Tạo file `jest.setup.ts` tại thư mục gốc

File này dùng để cấu hình môi trường test trước khi các testcase được chạy (ví dụ: thêm các hàm so sánh tùy chỉnh cho DOM).

Dán nội dung sau vào file:

```ts
// Mở rộng các hàm expect của Jest với testing-library (ví dụ: .toBeInTheDocument(), .toHaveClass() trong các bài test.)
import '@testing-library/jest-dom';
```

# Hướng dẫn Setup CI/CD trong Next.js
## 1. Tạo folder `.github/workflows/` Trong thư mục gốc của project, tạo cấu trúc sau:
```bash
my-nextjs-project/
├─ pages/
├─ components/
├─ package.json
├─ .github/
│   └─ workflows/
│       └─ ci.yaml
```

## 2. Khai báo sự kiện `on:`
Trong file `ci.yaml`, định nghĩa các event sẽ kích hoạt pipeline:
```yaml
on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main
      - develop
```

## 3. Tạo job `build-and-deploy:`
```bash
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Run tests
        run: npm test

      - name: Install Vercel CLI
        run: npm install -g vercel

      - name: Deploy to Vercel (Production)
        if: github.ref == 'refs/heads/main'
        run: vercel --prod --token=$VERCEL_TOKEN

      - name: Deploy to Vercel (Staging)
        if: github.ref == 'refs/heads/develop'
        run: vercel --token=$VERCEL_TOKEN
```