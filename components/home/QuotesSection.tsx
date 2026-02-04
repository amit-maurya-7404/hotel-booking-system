export default function QuotesSection() {
  const quotes = [
    {
      quote: '"This place changed my perspective on travel. Raw, real, and absolutely magical!"',
      author: 'Anshul Sharma',
      handle: '@anshulsujanian'
    },
    {
      quote: '"Found my tribe here. The Hideout Hiraeth is more than a hostel, it\'s a family."',
      author: 'Sarah Wilson',
      handle: '@sarahwanders'
    },
    {
      quote: '"Mountain living at its finest. No filters, just pure adventure and connection."',
      author: 'Rohan Kumar',
      handle: '@rohankadventure'
    },
  ]

  return (
    <section className="py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-black mb-16 text-center text-foreground">
          Caught Unquote
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {quotes.map((quote, idx) => (
            <div 
              key={idx}
              className="text-center space-y-4"
            >
              <p className="text-foreground text-base leading-relaxed italic">{quote.quote}</p>
              <div className="pt-2">
                <p className="text-sm font-bold text-foreground">{quote.author}</p>
                <p className="text-xs text-muted-foreground">{quote.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
