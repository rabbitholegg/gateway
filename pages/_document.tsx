import Document, {
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <script src="https://kit.fontawesome.com/890f717c54.js" async />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
