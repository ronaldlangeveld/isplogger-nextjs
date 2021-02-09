import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    

    render() {
        const paddle_keys = { vendor: 1234567, debug: true }
        return (
            <Html>
                <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ND6ZBGSSEQ"></script>
<script type="text/javascript" src="/gtag.js">


</script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="https://cdn.paddle.com/paddle/paddle.js"></script> 

                
                </body>
            </Html>
        )
    }
}



export default MyDocument
