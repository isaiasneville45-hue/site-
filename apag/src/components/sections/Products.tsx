import { useDeferredValue, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { Droplets, FireExtinguisher, Lightbulb, Search, Signpost, Siren, X, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  productCategories,
  type CategoryGuide,
  type Product,
  type ProductCategory,
  type ProductCategoryId,
} from '@/config/products'
import { headings, productsUi as ui } from '@/config/sections'
import { whatsappUrl } from '@/lib/contact'
import { getProductTab, isProductCategoryId, setProductTab, subscribeProductTab } from '@/lib/product-tab'
import { cn } from '@/lib/utils'

const categoryIcons: Record<ProductCategoryId, LucideIcon> = {
  sinalizacao: Signpost,
  alarme: Siren,
  hidrantes: Droplets,
  iluminacao: Lightbulb,
  extintores: FireExtinguisher,
}

export function Products() {
  const chosen = useSyncExternalStore(subscribeProductTab, getProductTab, () => null)
  const active = chosen ?? productCategories[0].id
  const listRef = useRef<HTMLDivElement>(null)

  // No mobile a lista de abas rola na horizontal: centraliza a aba ativa.
  // (Rola só a lista; scrollIntoView rolaria também a seção, que tem overflow oculto.)
  useEffect(() => {
    const list = listRef.current
    const trigger = list?.querySelector<HTMLElement>(`[data-value="${active}"]`)
    if (list && trigger && list.scrollWidth > list.clientWidth) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      list.scrollTo({
        left: trigger.offsetLeft - (list.clientWidth - trigger.offsetWidth) / 2,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }
  }, [active])

  const onTabChange = (value: string) => {
    if (isProductCategoryId(value)) setProductTab(value)
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
          eyebrow={headings.products.eyebrow}
          title={headings.products.title}
          description={headings.products.description}
        />

        <Tabs value={active} onValueChange={onTabChange} className="mt-12 lg:mt-14">
          {/* Abas: carrossel horizontal no mobile, centralizadas no desktop */}
          <div
            ref={listRef}
            className="relative -mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <TabsList aria-label={ui.tabsLabel} className="min-w-max lg:mx-auto lg:flex lg:w-fit">
              {productCategories.map((category) => {
                const Icon = categoryIcons[category.id]
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    data-value={category.id}
                    className="snap-start data-[state=active]:[&>span]:bg-black/25"
                  >
                    <Icon aria-hidden="true" />
                    {category.tabLabel}
                    <span className="rounded-full bg-white/10 px-2 py-0.5 font-sans text-[0.7rem] font-semibold tabular-nums">
                      {category.products.length}
                      <span className="sr-only"> produtos</span>
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
  const Icon = categoryIcons[category.id]

  return (
    <div className="grid gap-10 [&>*]:min-w-0">
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
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-apag-noir/60 px-3 py-1.5 font-display-label text-sm tracking-wide text-white/85 backdrop-blur">
              <Icon className="size-3.5 text-apag-ember" aria-hidden="true" />
              {ui.productsCount(category.products.length)}
            </span>
            <h3 className="font-display-title mt-5 text-[clamp(1.75rem,1.2rem+1.8vw,2.5rem)] text-balance">
              {category.title}
            </h3>
            <p className="mt-4 leading-relaxed text-white/85 text-pretty sm:text-lg">{category.intro}</p>
            {category.suppliers.length > 0 ? (
              <p className="mt-6 text-sm text-white/75">
                <span className="font-semibold text-white">{ui.partners} </span>
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

      {category.guide ? <Guide guide={category.guide} category={category} /> : null}

      <ProductBrowser category={category} icon={Icon} />
    </div>
  )
}

/* ── Bloco de ajuda ("Qual tamanho de placa…", "Convencional, endereçável…") ── */

function Guide({ guide, category }: { guide: CategoryGuide; category: ProductCategory }) {
  const titleId = useId()
  return (
    <section
      aria-labelledby={titleId}
      className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-6 sm:p-8"
    >
      <h4 id={titleId} className="font-display-title text-2xl">
        {guide.title}
      </h4>

      {guide.kind === 'columns' ? (
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {guide.columns.map((column) => (
            <li key={column.title} className="rounded-2xl border border-white/10 bg-apag-noir/60 p-5">
              <p className="font-display-label text-base tracking-wide text-apag-ember">{column.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{column.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="max-w-2xl">
            {guide.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-white/75 first:mt-0">
                {paragraph}
              </p>
            ))}
            <Button asChild size="sm" className="mt-6 h-auto min-h-9 whitespace-normal py-2 text-left">
              <a
                href={whatsappUrl(guide.ctaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${guide.cta} (WhatsApp, ${category.title})`}
              >
                <WhatsAppIcon />
                {guide.cta}
              </a>
            </Button>
          </div>
          {guide.table ? (
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <caption className="bg-white/[0.04] px-4 py-3 text-left font-display-label text-sm tracking-wide text-white/85">
                  {guide.table.caption}
                </caption>
                <thead className="text-white/60">
                  <tr>
                    {guide.table.head.map((cell) => (
                      <th key={cell} scope="col" className="px-4 py-2 font-semibold">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.table.rows.map(([size, distance]) => (
                    <tr key={size} className="border-t border-white/10">
                      <td className="px-4 py-2 tabular-nums text-white">{size}</td>
                      <td className="px-4 py-2 tabular-nums text-white/80">{distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <figcaption className="border-t border-white/10 px-4 py-2 text-xs text-white/55">
                {guide.table.source}
              </figcaption>
            </figure>
          ) : null}
        </div>
      )}
    </section>
  )
}

/* ── Filtros, busca e paginação ──────────────────────────────────────── */

const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function uniqueInOrder(values: (string | undefined)[], order: string[] = []) {
  const found = [...new Set(values.filter((v): v is string => Boolean(v)))]
  return found.sort((a, b) => {
    const ia = order.indexOf(a)
    const ib = order.indexOf(b)
    return (ia === -1 ? order.length : ia) - (ib === -1 ? order.length : ib)
  })
}

function ProductBrowser({ category, icon }: { category: ProductCategory; icon: LucideIcon }) {
  const [group, setGroup] = useState<string | null>(null)
  const [supplier, setSupplier] = useState<string | null>(null)
  const [system, setSystem] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(ui.pageSize)
  const deferredQuery = useDeferredValue(query)
  const searchId = useId()
  const countId = useId()

  const groups = useMemo(
    () =>
      uniqueInOrder(
        category.products.map((p) => p.group),
        category.groups,
      ),
    [category],
  )
  const suppliers = useMemo(() => uniqueInOrder(category.products.map((p) => p.supplier)), [category])
  const systems = useMemo(
    () =>
      uniqueInOrder(
        category.products.map((p) => p.system),
        ['Convencional', 'Endereçável', 'Analógico', 'Sem fio'],
      ),
    [category],
  )

  const filtered = useMemo(() => {
    const q = normalize(deferredQuery.trim())
    const ordered = [...category.products].sort((a, b) => groups.indexOf(a.group) - groups.indexOf(b.group))
    return ordered.filter(
      (p) =>
        (!group || p.group === group) &&
        (!supplier || p.supplier === supplier) &&
        (!system || p.system === system) &&
        (!q || normalize(`${p.name} ${p.code ?? ''} ${p.supplier}`).includes(q)),
    )
  }, [category, groups, group, supplier, system, deferredQuery])

  // Qualquer mudança de filtro volta para a primeira página.
  const resetPage =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value)
      setLimit(ui.pageSize)
    }

  const visible = filtered.slice(0, limit)
  const hasFilters = Boolean(group || supplier || system || query)

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <label htmlFor={searchId} className="sr-only">
          {ui.searchLabel}
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/50"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => resetPage(setQuery)(event.target.value)}
            placeholder={ui.searchPlaceholder}
            aria-describedby={countId}
            className="h-12 w-full rounded-full border border-white/15 bg-apag-noir/70 pl-11 pr-4 text-base text-white placeholder:text-white/45 focus-visible:border-apag-red-65"
          />
        </div>
        <ChipGroup label={ui.groupFilter} options={groups} value={group} onChange={resetPage(setGroup)} />
        {suppliers.length > 1 ? (
          <ChipGroup label={ui.supplierFilter} options={suppliers} value={supplier} onChange={resetPage(setSupplier)} />
        ) : null}
        {systems.length > 1 ? (
          <ChipGroup label={ui.systemFilter} options={systems} value={system} onChange={resetPage(setSystem)} />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p id={countId} aria-live="polite" className="text-sm text-white/70">
          {ui.showing(visible.length, filtered.length)}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setGroup(null)
              setSupplier(null)
              setSystem(null)
              setQuery('')
              setLimit(ui.pageSize)
            }}
            className="inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-apag-ember hover:text-white"
          >
            <X className="size-4" aria-hidden="true" />
            {ui.clearFilters}
          </button>
        ) : null}
      </div>

      {visible.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} category={category} icon={icon} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-white/70">{ui.empty}</p>
      )}

      {filtered.length > visible.length ? (
        <div className="flex justify-center">
          <Button type="button" variant="outline" onClick={() => setLimit((current) => current + ui.pageSize)}>
            {ui.loadMore(filtered.length - visible.length)}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string | null
  onChange: (value: string | null) => void
}) {
  const labelId = useId()
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span id={labelId} className="shrink-0 font-display-label text-sm tracking-wide text-white/60 sm:w-24">
        {label}
      </span>
      <div role="group" aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {[null, ...options].map((option) => {
          const selected = option === value
          return (
            <button
              key={option ?? 'todos'}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                selected
                  ? 'border-apag-red bg-apag-red text-white shadow-glow'
                  : 'border-white/15 bg-white/[0.03] text-white/75 hover:border-white/30 hover:text-white',
              )}
            >
              {option ?? ui.all}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Card de produto ─────────────────────────────────────────────────── */

/** "Nome Código – Medida", sem repetir o código quando ele já está no nome. */
function quoteItem(product: Product, size: string | null) {
  const hasCode = product.code && !normalize(product.name).includes(normalize(product.code))
  return [product.name, hasCode ? product.code : null].filter(Boolean).join(' ') + (size ? ` – ${size}` : '')
}

function ProductCard({
  product,
  category,
  icon: Icon,
}: {
  product: Product
  category: ProductCategory
  icon: LucideIcon
}) {
  const [size, setSize] = useState<string | null>(null)
  const sizesId = useId()

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
            {product.illustrative ? (
              // Foto de banco de imagem: só ilustra o tipo de produto.
              <span className="absolute bottom-3 left-3 rounded-full bg-apag-noir/75 px-2.5 py-1 text-[0.7rem] font-semibold text-white backdrop-blur">
                {ui.illustrative}
              </span>
            ) : null}
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
            <span aria-hidden="true" className="font-display-label text-sm leading-snug text-white/70">
              {product.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {product.supplier || product.code ? (
          <div className="flex flex-wrap items-center gap-2">
            {product.code ? (
              <span className="rounded-md bg-apag-red/15 px-2 py-0.5 font-display text-sm font-semibold tracking-wide text-apag-ember ring-1 ring-apag-red-45">
                {product.code}
              </span>
            ) : null}
            {product.supplier ? (
              <span className="font-display-label text-sm tracking-wide text-white/60">{product.supplier}</span>
            ) : null}
          </div>
        ) : null}
        <h4
          className={cn(
            'text-base font-semibold leading-snug text-white',
            (product.supplier || product.code) && 'mt-2',
          )}
        >
          {product.name}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{product.description}</p>

        {product.specs?.length ? (
          <ul className="mt-3 grid gap-1 text-sm text-white/80">
            {product.specs.map((spec) => (
              <li key={spec} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-apag-red" />
                {spec}
              </li>
            ))}
          </ul>
        ) : null}

        {product.materials?.length ? (
          <p className="mt-3 text-sm text-white/65">
            <span className="font-semibold text-white/80">{ui.materialsLabel}: </span>
            {product.materials.join(' · ')}
          </p>
        ) : null}

        <div className="mt-auto pt-5">
          {product.sizes?.length ? (
            <div className="mb-4">
              <p id={sizesId} className="font-display-label text-sm tracking-wide text-white/60">
                {ui.sizeLabel}
              </p>
              <div role="radiogroup" aria-labelledby={sizesId} className="mt-2 flex flex-wrap gap-1.5">
                {product.sizes.map((option) => {
                  const checked = option === size
                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      onClick={() => setSize(checked ? null : option)}
                      className={cn(
                        'rounded-full border px-2.5 py-1 text-xs font-medium tabular-nums transition-colors',
                        checked
                          ? 'border-apag-red bg-apag-red text-white'
                          : 'border-white/15 text-white/75 hover:border-white/35 hover:text-white',
                      )}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          <Button asChild size="sm" variant="outline" className="self-start">
            <a
              href={whatsappUrl(ui.quoteMessage(quoteItem(product, size), category.title))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {ui.quote}
              <span className="sr-only"> de {quoteItem(product, size)} pelo WhatsApp</span>
            </a>
          </Button>
        </div>
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
