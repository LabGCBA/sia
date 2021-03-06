import React, {Component, PropTypes} from 'react';

import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object
    };

    render() {
        const {assets, component, store} = this.props;
        const content = component
            ? ReactDOM.renderToString(component)
            : '';
        const head = Helmet.rewind();

        return (
            <html lang="en-US">
                <head>
                    {head
                        .base
                        .toComponent()}
                    {head
                        .title
                        .toComponent()}
                    {head
                        .meta
                        .toComponent()}
                    {head
                        .link
                        .toComponent()}
                    {head
                        .script
                        .toComponent()}
                    <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"
                      integrity="sha256-t2/7smZfgrST4FS1DT0bs/KotCM74XlcqZN5Vu7xlrw=" crossOrigin="anonymous" />
                    {/* <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" /> */}
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {/* styles (will be present only in production with webpack extract text plugin) */}
                    {Object
                        .keys(assets.styles)
                        .map((style, key) => <link
                          href={assets.styles[style]}
                          key={key}
                          media="screen, projection"
                          rel="stylesheet"
                          type="text/css"
                          charSet="UTF-8" />)}
                </head>
                <body>
                    <div
                      id="content"
                      dangerouslySetInnerHTML={{
                          __html: content
                      }} />
                    <script
                      dangerouslySetInnerHTML={{
                          __html: `window.__data=${serialize(store.getState())};`
                      }}
                      charSet="UTF-8" />
                    <script src={assets.javascript.main} charSet="UTF-8" />
                </body>
            </html>
        );
    }
}
