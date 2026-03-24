export const metadata = {
  title: 'Get Clicked — Sign Up',
  description: 'Create your free Get Clicked account.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'TWK Lausanne';
            src: url('/fonts/TWKLausanne-700.woff2') format('woff2');
            font-weight: 700;
            font-display: swap;
          }
          @font-face {
            font-family: 'TWK Lausanne';
            src: url('/fonts/TWKLausanne-800.woff2') format('woff2');
            font-weight: 800;
            font-display: swap;
          }
        `}} />
      </head>
      <body style={{
        margin: 0,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        background: '#FAFAFA',
        color: '#111',
        WebkitFontSmoothing: 'antialiased',
      }}>
        {children}
      </body>
    </html>
  )
}
