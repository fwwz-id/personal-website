Here is the style example

```tsx
          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line font-grotesk leading-relaxed">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={index} className="brutalist-heading text-2xl md:text-3xl mt-12 mb-6 first:mt-0">
                      {line.substring(2)}
                    </h1>
                  );
                }
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={index} className="brutalist-heading text-xl md:text-2xl mt-10 mb-4">
                      {line.substring(3)}
                    </h2>
                  );
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={index} className="font-bold text-lg mt-6 mb-3">
                      {line.substring(2, line.length - 2)}
                    </p>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={index} className="ml-6 mb-2">
                      {line.substring(2)}
                    </li>
                  );
                }
                if (line.trim() === '') {
                  return <div key={index} className="h-4"></div>;
                }
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>
          </article>
```