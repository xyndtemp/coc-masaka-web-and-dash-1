import * as Sentry from '@/overrides/sentry.override';

export const loadScript = (url: string, key: string) => {
    const id = `${key}-script`;
    let script: HTMLScriptElement = document.getElementById(
        id
    ) as HTMLScriptElement;

    return new Promise<string | void>((resolve, reject) => {
        const onScriptLoad = () => {
            (script as HTMLScriptElement).dataset.loaded = 'true';
            resolve();
        };

        if (script) {
            if (script.dataset.loaded === 'true') {
                resolve();
            } else {
                script.addEventListener('load', onScriptLoad);
            }
        } else {
            script = document.createElement('script');
            script.id = id;
            script.async = true;

            script.onerror = (e: Event | string) => {
                const message = `The script ${url} didn't load correctly.`;

                Sentry.captureException(e, {
                    extra: {
                        message
                    }
                });

                reject(e);
            };
            script.addEventListener('load', onScriptLoad);

            document.head.appendChild(script);
            script.src = url;
        }
    });
};
