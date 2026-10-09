import { useRef, useState } from 'react'
import { Droplets, FireExtinguisher, Lightbulb, Signpost, Siren, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { productCategories, type Product, type ProductCategory, type ProductCategoryId } from '@/config/products'
import { whatsappUrl } from '@/lib/contact'
import { cn } from '@/lib/utils'

const categoryIcons: Record<ProductCategoryId, LucideIcon> = {
  sinalizacao: Signpost,
  alarme: Siren,
  hidrantes: Droplets,
  iluminacao: Lightbulb,
  extintores: FireExtinguisher,
}

/** Mensagem do botão "Pedir orçamento" de cada produto. */
const quoteMessage = (product: Product, category: ProductCategory) =>
  `Olá! Vim pelo site e gostaria de um orçamento de: ${product.name} (${category.title}).`

export function Products() {
  const [active, setActive] = useState<string>(productCategories[0].id)
  const listRef = useRef<HTMLDivElement>(null)

  const onTabChange = (value: string) => {
    setActive(value)
    // No mobile a lista de abas rola na horizontal: centraliza a aba escolhida.
    // (Rola só a lista; scrollIntoView rolaria também a seção, que tem overflow oculto.)
    const list = listRef.current
    const trigger = list?.querySelector<HTMLElement>(`[data-value="${value}"]`)
    if (list && trigger && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: trigger.offsetLeft - (list.clientWidth - trigger.offsetWidth) / 2, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="produtos"
      aria-labelledby="produtos-title"
      className="relative overflow-clip-safe bg-apag-black py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 top-40 size-[36rem] rounded-full bg-apag-crimson/10 blur-[140px]"
      />

      <div className="container relative">
        <SectionHeading
          id="produtos-title"
          eyebrow="Produtos"
          title="Equipamentos para cada sistema"
          description="Revendemos e instalamos produtos de fabricantes reconhecidos, com orientação técnica para você escolher o equipamento certo para o seu imóvel."
        />

        <Tabs value={active} onValueChange={onTabChange} className="mt-12 lg:mt-14">
          {/* Abas: carrossel horizontal no mobile, centralizadas no desktop */}
          <div
            ref={listRef}
            className="relative -mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <TabsList aria-label="Categorias de produtos" className="min-w-max lg:mx-auto lg:flex lg:w-fit">
              {productCategories.map((category) => {
                const Icon = categoryIcons[category.id]
                return (
                  <TabsTrigger key={category.id} value={category.id} data-value={category.id} className="snap-start">
                    <Icon aria-hidden="true" />
                    {category.title}
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.7rem] font-semibold tabular-nums">
                      {category.products.length}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {productCategories.map((category) => (
            // forceMount: todas as categorias ficam no HTML pré-renderizado (bom para SEO);
            // as inativas ficam ocultas.
            <TabsContent key={category.id} value={category.id} forceMount className="data-[state=inactive]:hidden">
              <CategoryPanel category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

function CategoryPanel({ category }: { category: ProductCategory }) {
  const groups = groupProducts(category.products)
  const Icon = categoryIcons[category.id]

  return (
    <div className="grid gap-10">
      <Reveal>
        <div className="relative isolate flex min-h-[20rem] items-end overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] lg:min-h-[24rem]">
          {category.cover ? (
            <img
              src={category.cover}
              srcSet={coverSrcSet(category.cover)}
              sizes="(min-width: 1280px) 1200px, 100vw"
              alt={category.coverAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-20 size-full object-cover"
              style={category.coverPosition ? { objectPosition: category.coverPosition } : undefined}
            />
          ) : (
            <div aria-hidden="true" className="absolute inset-0 -z-20 bg-crimson-noir" />
          )}
          {/* Overlay Crimson Noir para o texto ficar legível sobre a foto */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(2_6_14/0.94)_0%,rgb(2_6_14/0.82)_45%,rgb(2_6_14/0.25)_100%)] max-lg:bg-[linear-gradient(0deg,rgb(2_6_14/0.96)_0%,rgb(2_6_14/0.8)_55%,rgb(2_6_14/0.35)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-apag-crimson/25 to-transparent"
          />

          <div className="max-w-2xl p-6 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-apag-noir/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur">
              <Icon className="size-3.5 text-apag-ember" aria-hidden="true" />
              {category.products.length} produtos
            </span>
            <h3 className="font-display-title mt-5 text-[clamp(1.35rem,1rem+1.4vw,2.1rem)] text-balance">
              {category.title}
            </h3>
            <p className="mt-4 leading-relaxed text-white/85 text-pretty sm:text-lg">{category.intro}</p>
            {category.suppliers.length > 0 ? (
              <p className="mt-6 text-sm text-white/75">
                <span className="font-semibold text-white">Trabalhamos com: </span>
                {category.suppliers.map((supplier, i) => (
                  <span key={supplier.name}>
                    {i > 0 ? ', ' : null}
                    <a
                      href={supplier.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-apag-ember underline-offset-4 hover:underline"
                    >
                      {supplier.name}
                    </a>
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        </div>
      </Reveal>

      {groups.map(({ group, products }) => (
        <div key={group ?? 'todos'}>
          {group ? (
            <h4 className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
              <span aria-hidden="true" className="h-px w-6 bg-apag-red" />
              {group}
            </h4>
          ) : null}
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} category={category} icon={Icon} headingLevel={group ? 'h5' : 'h4'} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ProductCard({
  product,
  category,
  icon: Icon,
  headingLevel: Heading,
}: {
  product: Product
  category: ProductCategory
  icon: LucideIcon
  headingLevel: 'h4' | 'h5'
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-apag-red hover:shadow-glow-lg focus-within:border-apag-red-65">
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.image ? (
          <div className="size-full bg-white">
            <img
              src={product.image}
              alt={product.imageAlt}
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              className={cn(
                'size-full transition-transform duration-500 ease-out group-hover:scale-[1.06]',
                product.imageFit === 'cover' ? 'object-cover' : 'object-contain p-4',
              )}
            />
          </div>
        ) : (
          // Placeholder enquanto a foto do produto não chega
          <div
            role="img"
            aria-label={product.imageAlt}
            className="flex size-full flex-col items-center justify-center gap-3 bg-apag-noir bg-grid p-6 text-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-apag-red-45 shadow-glow ring-1 ring-apag-red-65">
              <Icon className="size-7 text-white" aria-hidden="true" />
            </span>
            <span
              aria-hidden="true"
              className="font-display text-xs uppercase leading-snug tracking-wide text-white/70"
            >
              {product.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {product.brand ? (
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-apag-ember">{product.brand}</span>
        ) : null}
        <Heading className={cn('font-semibold leading-snug text-white', product.brand && 'mt-1.5')}>
          {product.name}
        </Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{product.description}</p>
        <Button asChild size="sm" variant="outline" className="mt-5 self-start">
          <a href={whatsappUrl(quoteMessage(product, category))} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Pedir orçamento
            <span className="sr-only"> de {product.name} pelo WhatsApp</span>
          </a>
        </Button>
      </div>
    </article>
  )
}

/**
 * Capas em public/fotos/{id}-{largura}.webp: a partir do arquivo maior
 * (ex.: "...-1600.webp"), monta o srcset com a versão de 800 px.
 */
function coverSrcSet(cover: string) {
  const match = /^(.*)-(\d+)\.webp$/.exec(cover)
  if (!match || Number(match[2]) <= 800) return undefined
  return `${match[1]}-800.webp 800w, ${cover} ${match[2]}w`
}

/** Agrupa os produtos pelo campo `group`, mantendo a ordem em que aparecem. */
function groupProducts(products: Product[]) {
  const groups: { group?: string; products: Product[] }[] = []
  for (const product of products) {
    const last = groups.find((g) => g.group === product.group)
    if (last) last.products.push(product)
    else groups.push({ group: product.group, products: [product] })
  }
  return groups
}
