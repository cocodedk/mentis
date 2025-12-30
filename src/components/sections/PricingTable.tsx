import { Card } from '@/components/ui'
import { Grid } from '@/components/layout'
import { pricingData } from '@/data/pricing'

/**
 * Pricing table component
 * Groups prices by category
 * Handles "Efter aftale" visual distinction
 */
export function PricingTable() {
  return (
    <div className="space-y-12">
      {pricingData.map((category) => (
        <div key={category.category}>
          <h2 className="text-h2 text-primary-500 mb-6">{category.category}</h2>
          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="md">
            {category.items.map((item, index) => (
              <Card key={index} variant="pricing">
                <h3 className="text-h3 text-neutral-900 mb-2">{item.name}</h3>
                <div className="text-body-lg font-semibold text-primary-500 mb-2">
                  {item.price === 'Efter aftale' ? (
                    <span className="text-neutral-600 italic">
                      {item.price}
                    </span>
                  ) : (
                    item.price
                  )}
                </div>
                {item.description && (
                  <p className="text-body-sm text-neutral-600">
                    {item.description}
                  </p>
                )}
              </Card>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  )
}
