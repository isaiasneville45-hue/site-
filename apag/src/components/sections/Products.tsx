import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from 'react'
import {
  Droplets,
  FireExtinguisher,
  Lightbulb,
  Search,
  Signpost,
  Siren,
  SlidersHorizontal,
  X,
  type LucideIcon,
} from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  productCategories,
  type CategoryGuide,
  type Product,
  type ProductCategory,
  type ProductCategoryId,
} from '@/config/products'
import { headings, manufacturersUi, productsUi as ui } from '@/config/sections'
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
  // (Rola só a lista; scrollIntoView rolaria também a seção.)
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
    <section id="produtos" aria-labelledby="produtos-title" className="section-pad bg-apag-paper">
      <div className="container">
        <SectionHeader
          id="produtos-title"
          index={headings.products.index}
          label={headings.products.label}
          meta={`${totalProducts} produtos`}
          title={headings.products.title}
          description={headings.products.description}
        />

        <Tabs value={active} onValueChange={onTabChange} className="mt-14 lg:mt-20">
          <div
            ref={listRef}
            className="relative -mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <TabsList aria-label={ui.tabsLabel} className="min-w-max">
              {productCategories.map((category) => {
                const Icon = categoryIcons[category.id]
                return (
                  <TabsTrigger key={category.id} value={category.id} data-value={category.id}>
                    <Icon strokeWidth={1.75} aria-hidden="true" />
                    {category.tabLabel}
                    <span className="text-tech font-normal text-apag-muted">
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
              <ProductBrowser category={category} icon={categoryIcons[category.id]} />
            </TabsContent>
          ))}
        </Tabs>

        <Manufacturers />
      </div>
    </section>
  )
}

const totalProducts = productCategories.reduce((sum, category) => sum + category.products.length, 0)

/** Fabricantes com produtos no catálogo: nome, quantidade de itens e link para o site. */
const manufacturers = (() => {
  const urls = new Map<string, string>()
  for (const category of productCategories) {
    for (const supplier of category.suppliers) if (!urls.has(supplier.name)) urls.set(supplier.name, supplier.url)
  }
  const counts = new Map<string, number>()
  for (const category of productCategories) {
    for (const product of category.products) {
      if (product.supplier) counts.set(product.supplier, (counts.get(product.supplier) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count, url: urls.get(name) }))
})()

function Manufacturers() {
  return (
    <Reveal className="mt-20 lg:mt-28">
      <div className="flex items-center justify-between border-t border-apag-line-strong pt-4 text-tech text-apag-muted">
        <h3 className="text-apag-ink">{manufacturersUi.title}</h3>
        <span>{manufacturers.length}</span>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-apag-line bg-apag-line sm:grid-cols-4">
        {manufacturers.map((m) => (
          <li key={m.name} className="bg-white">
            {m.url ? (
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-6 p-5 sm:p-6"
              >
                <ManufacturerBody name={m.name} count={m.count} />
                <span className="text-sm font-medium text-apag-slate underline decoration-apag-line-strong underline-offset-4 transition-colors group-hover:text-apag-ink group-hover:decoration-apag-red">
                  {manufacturersUi.visit}
                  <span className="sr-only">: {m.name} (abre em nova aba)</span>
                </span>
              </a>
            ) : (
              <div className="flex h-full flex-col p-5 sm:p-6">
                <ManufacturerBody name={m.name} count={m.count} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function ManufacturerBody({ name, count }: { name: string; count: number }) {
  return (
    <span className="block">
      <span className="block text-xl font-semibold tracking-[-0.03em] text-apag-ink sm:text-2xl">{name}</span>
      <span className="mt-1 block text-tech text-apag-muted">{manufacturersUi.count(count)}</span>
    </span>
  )
}

/* ── Cabeçalho da categoria e guia de escolha ─────────────────────────── */

function CategoryIntro({ category }: { category: ProductCategory }) {
  return (
    <div className="flex flex-col gap-4 border-b border-apag-line pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div className="max-w-2xl">
        <h3 className="text-heading text-2xl">{category.title}</h3>
        <p className="mt-2 leading-relaxed text-apag-slate">{category.intro}</p>
      </div>
      {category.suppliers.length > 0 ? (
        <p className="shrink-0 text-sm text-apag-slate lg:text-right">
          <span className="block text-label text-apag-muted">{ui.partners}</span>
          <span className="mt-1 block">
            {category.suppliers.map((supplier, i) => (
              <span key={supplier.name}>
                {i > 0 ? ', ' : null}
                <a
                  href={supplier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-apag-ink underline decoration-apag-line-strong underline-offset-4 transition-colors hover:decoration-apag-red"
                >
                  {supplier.name}
                </a>
              </span>
            ))}
          </span>
        </p>
      ) : null}
    </div>
  )
}

function Guide({ guide, category }: { guide: CategoryGuide; category: ProductCategory }) {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId} className="rounded-lg border border-apag-line bg-white p-5 sm:p-6">
      <h4 id={titleId} className="text-heading text-base">
        {guide.title}
      </h4>
      {guide.kind === 'columns' ? (
        <dl className="mt-4 grid gap-4 md:grid-cols-3 md:gap-6">
          {guide.columns.map((column) => (
            <div
              key={column.title}
              className="md:border-l md:border-apag-line-strong md:pl-4 md:first:border-l-0 md:first:pl-0"
            >
              <dt className="text-sm font-semibold text-apag-ink">{column.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-apag-slate">{column.text}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="mt-2 grid gap-4">
          <div className="max-w-3xl text-sm leading-relaxed text-apag-slate">
            {guide.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="h-auto min-h-9 self-start whitespace-normal py-2 text-left"
          >
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
      )}
    </section>
  )
}

/* ── Busca, filtros e paginação ──────────────────────────────────────── */

const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function uniqueInOrder(values: (string | undefined)[], order: string[] = []) {
  const found = [...new Set(values.filter((v): v is string => Boolean(v)))]
  return found.sort((a, b) => {
    const ia = order.indexOf(a)
    const ib = order.indexOf(b)
    return (ia === -1 ? order.length : ia) - (ib === -1 ? order.length : ib)
  })
}

type Facet = 'group' | 'supplier' | 'system'

function ProductBrowser({ category, icon }: { category: ProductCategory; icon: LucideIcon }) {
  const [filters, setFilters] = useState<Record<Facet, string | null>>({ group: null, supplier: null, system: null })
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(ui.pageSize)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  // quem abriu os detalhes recebe o foco de volta ao fechar
  const opener = useRef<HTMLElement | null>(null)
  const deferredQuery = useDeferredValue(query)
  const searchId = useId()
  const countId = useId()
  const facetsId = useId()

  const options = useMemo(
    () => ({
      group: uniqueInOrder(
        category.products.map((p) => p.group),
        category.groups,
      ),
      supplier: uniqueInOrder(category.products.map((p) => p.supplier)),
      system: uniqueInOrder(
        category.products.map((p) => p.system),
        ['Convencional', 'Endereçável', 'Analógico', 'Sem fio'],
      ),
    }),
    [category],
  )

  // Produto passa nos filtros (ignorando um deles, para as contagens de cada faceta).
  const matcher = useMemo(() => {
    const q = normalize(deferredQuery.trim())
    return (p: Product, ignore?: Facet) =>
      (ignore === 'group' || !filters.group || p.group === filters.group) &&
      (ignore === 'supplier' || !filters.supplier || p.supplier === filters.supplier) &&
      (ignore === 'system' || !filters.system || p.system === filters.system) &&
      (!q || normalize(`${p.name} ${p.code ?? ''} ${p.supplier}`).includes(q))
  }, [filters, deferredQuery])

  const filtered = useMemo(() => {
    const order = options.group
    return [...category.products]
      .sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group))
      .filter((p) => matcher(p))
  }, [category, options, matcher])

  const countFor = (facet: Facet, value: string | null) =>
    category.products.filter((p) => matcher(p, facet) && (value === null || p[facet] === value)).length

  // Qualquer mudança de filtro volta para a primeira página.
  const setFacet = (facet: Facet, value: string | null) => {
    setFilters((current) => ({ ...current, [facet]: value }))
    setLimit(ui.pageSize)
  }
  const clearAll = () => {
    setFilters({ group: null, supplier: null, system: null })
    setQuery('')
    setLimit(ui.pageSize)
  }

  const visible = filtered.slice(0, limit)
  const activeFilters = Object.values(filters).filter(Boolean).length
  const hasFilters = activeFilters > 0 || query !== ''
  const facets: { key: Facet; label: string }[] = [
    { key: 'group', label: ui.groupFilter },
    { key: 'supplier', label: ui.supplierFilter },
    { key: 'system', label: ui.systemFilter },
  ]

  return (
    <div className="grid gap-8 pt-8 [&>*]:min-w-0">
      <CategoryIntro category={category} />

      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        {/* Busca e filtros: coluna fixa no desktop; no celular, os filtros abrem num painel */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <label htmlFor={searchId} className="text-label text-apag-slate">
            {ui.searchLabel}
          </label>
          <div className="relative mt-2">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-apag-muted"
              aria-hidden="true"
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setLimit(ui.pageSize)
              }}
              placeholder={ui.searchPlaceholder}
              aria-describedby={countId}
              className="h-11 w-full rounded-md border border-apag-line-strong bg-white pl-10 pr-3 text-base text-apag-ink placeholder:text-apag-muted hover:border-apag-muted focus-visible:border-apag-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apag-ink/15"
            />
          </div>

          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls={facetsId}
            onClick={() => setFiltersOpen((open) => !open)}
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-md border border-apag-line-strong px-3.5 text-sm font-semibold text-apag-ink hover:border-apag-ink lg:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {ui.filters}
            {activeFilters > 0 ? (
              <span className="grid size-5 place-items-center rounded-sm bg-apag-red text-xs text-white tabular-nums">
                {activeFilters}
              </span>
            ) : null}
          </button>

          <div id={facetsId} className={cn('mt-6 gap-6 lg:mt-8 lg:grid lg:gap-8', filtersOpen ? 'grid' : 'hidden')}>
            {facets.map(({ key, label }) =>
              options[key].length > 1 ? (
                <FacetGroup
                  key={key}
                  label={label}
                  options={options[key]}
                  value={filters[key]}
                  count={(value) => countFor(key, value)}
                  onChange={(value) => setFacet(key, value)}
                />
              ) : null,
            )}
          </div>
        </aside>

        <div className="grid content-start gap-6 [&>*]:min-w-0">
          {category.guide ? <Guide guide={category.guide} category={category} /> : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p id={countId} aria-live="polite" className="text-sm text-apag-slate">
              {ui.showing(visible.length, filtered.length)}
            </p>
            {hasFilters ? (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-apag-red-strong hover:underline hover:underline-offset-4"
              >
                <X className="size-4" aria-hidden="true" />
                {ui.clearFilters}
              </button>
            ) : null}
          </div>

          {visible.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((product) => (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                    category={category}
                    icon={icon}
                    onOpen={() => {
                      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
                      setSelected(product)
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-apag-line-strong px-6 py-12 text-center">
              <p className="text-apag-slate">{ui.empty}</p>
              <Button variant="secondary" size="sm" className="mt-4" onClick={clearAll}>
                {ui.clearFilters}
              </Button>
            </div>
          )}

          {filtered.length > visible.length ? (
            <div className="flex justify-center pt-2">
              <Button type="button" variant="secondary" onClick={() => setLimit((current) => current + ui.pageSize)}>
                {ui.loadMore(filtered.length - visible.length)}
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <ProductDialog
        product={selected}
        category={category}
        icon={icon}
        onOpenChange={(open) => !open && setSelected(null)}
        returnFocus={opener}
      />
    </div>
  )
}

function FacetGroup({
  label,
  options,
  value,
  count,
  onChange,
}: {
  label: string
  options: string[]
  value: string | null
  count: (value: string | null) => number
  onChange: (value: string | null) => void
}) {
  const labelId = useId()
  return (
    <div>
      <p id={labelId} className="text-label text-apag-slate">
        {label}
      </p>
      {/* celular: chips; desktop: lista vertical com contagem */}
      <div role="group" aria-labelledby={labelId} className="mt-2 flex flex-wrap gap-2 lg:mt-3 lg:flex-col lg:gap-0.5">
        {[null, ...options].map((option) => {
          const selected = option === value
          const n = count(option)
          return (
            <button
              key={option ?? 'todos'}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              disabled={n === 0 && !selected}
              className={cn(
                'relative inline-flex items-center gap-2 rounded-sm text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                'max-lg:h-9 max-lg:border max-lg:px-3',
                'lg:w-full lg:justify-between lg:px-3 lg:py-2 lg:text-left',
                selected
                  ? 'font-semibold text-apag-ink max-lg:border-apag-ink max-lg:bg-apag-ink max-lg:text-white lg:bg-white lg:before:absolute lg:before:inset-y-1.5 lg:before:left-0 lg:before:w-0.5 lg:before:bg-apag-red'
                  : 'text-apag-slate hover:text-apag-ink max-lg:border-apag-line-strong max-lg:bg-white lg:hover:bg-white',
              )}
            >
              <span>{option ?? ui.all}</span>
              <span
                className={cn(
                  'font-mono text-xs tabular-nums',
                  selected ? 'max-lg:text-white/70 lg:text-apag-slate' : 'text-apag-muted',
                )}
              >
                {n}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Card e detalhes do produto ──────────────────────────────────────── */

/** "Nome Código – Medida", sem repetir o código quando ele já está no nome. */
function quoteItem(product: Product, size: string | null) {
  const hasCode = product.code && !normalize(product.name).includes(normalize(product.code))
  return [product.name, hasCode ? product.code : null].filter(Boolean).join(' ') + (size ? ` – ${size}` : '')
}

function quoteHref(product: Product, category: ProductCategory, size: string | null) {
  return whatsappUrl(ui.quoteMessage(quoteItem(product, size), category.title))
}

function ProductImage({
  product,
  icon: Icon,
  className,
  sizes,
}: {
  product: Product
  icon: LucideIcon
  className?: string
  sizes?: string
}) {
  if (!product.image) {
    // Sem foto do fabricante: ícone da categoria
    return (
      <div role="img" aria-label={product.imageAlt} className={cn('grid place-items-center bg-apag-paper', className)}>
        <Icon className="size-10 text-apag-line-strong" strokeWidth={1.25} aria-hidden="true" />
      </div>
    )
  }
  return (
    <div className={cn('relative bg-white', className)}>
      <img
        src={product.image}
        alt={product.imageAlt}
        loading="lazy"
        decoding="async"
        width={800}
        height={600}
        sizes={sizes}
        className={cn('size-full', product.imageFit === 'cover' ? 'object-cover' : 'object-contain p-2.5 sm:p-5')}
      />
      {product.illustrative ? (
        // Foto de banco de imagem: só ilustra o tipo de produto.
        <span className="absolute bottom-2 left-2 rounded-sm bg-white/90 px-2 py-0.5 text-[0.6875rem] font-medium text-apag-slate ring-1 ring-apag-line">
          {ui.illustrative}
        </span>
      ) : null}
    </div>
  )
}

function ProductMeta({ product }: { product: Product }) {
  if (!product.supplier && !product.code) return null
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
      {product.supplier ? <span className="font-medium text-apag-slate">{product.supplier}</span> : null}
      {product.code ? (
        <span className="rounded-sm bg-apag-paper px-1.5 py-0.5 text-tech text-apag-ink">{product.code}</span>
      ) : null}
    </div>
  )
}

function ProductCard({
  product,
  category,
  icon,
  onOpen,
}: {
  product: Product
  category: ProductCategory
  icon: LucideIcon
  onOpen: () => void
}) {
  return (
    // celular: miniatura à esquerda e ações embaixo; a partir de 640 px, card vertical
    <article className="group relative grid h-full grid-cols-[6.5rem_minmax(0,1fr)] overflow-hidden rounded-lg border border-apag-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-apag-line-strong hover:shadow-[0_12px_32px_-20px_rgb(11_20_36/0.35)] sm:flex sm:flex-col">
      <ProductImage
        product={product}
        icon={icon}
        sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 104px"
        className="aspect-square border-r border-apag-line sm:aspect-[4/3] sm:border-b sm:border-r-0"
      />
      <div className="flex flex-col p-4 sm:flex-1 sm:p-5 sm:pb-0">
        <ProductMeta product={product} />
        <h4 className="mt-2 text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em] text-apag-ink">
          {/* o nome abre os detalhes; o clique vale para o card inteiro */}
          <button
            type="button"
            onClick={onOpen}
            className="text-left after:absolute after:inset-0 after:content-[''] hover:text-apag-red-strong"
          >
            {product.name}
          </button>
        </h4>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-apag-slate">{product.description}</p>
        {product.sizes?.length ? (
          <p className="mt-2 text-[0.8125rem] font-medium text-apag-muted">{ui.sizesCount(product.sizes.length)}</p>
        ) : null}
      </div>
      <div className="relative z-10 col-span-2 flex items-center gap-2 border-t border-apag-line px-4 py-3 sm:mt-auto sm:border-t-0 sm:px-5 sm:pb-5 sm:pt-4">
        <Button asChild size="sm" variant="secondary" className="flex-1">
          <a href={quoteHref(product, category, null)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {ui.quote}
            <span className="sr-only"> de {quoteItem(product, null)} pelo WhatsApp</span>
          </a>
        </Button>
        <Button size="sm" variant="ghost" className="px-2.5" onClick={onOpen}>
          {ui.details}
          <span className="sr-only"> de {product.name}</span>
        </Button>
      </div>
    </article>
  )
}

function ProductDialog({
  product,
  category,
  icon,
  onOpenChange,
  returnFocus,
}: {
  product: Product | null
  category: ProductCategory
  icon: LucideIcon
  onOpenChange: (open: boolean) => void
  returnFocus: RefObject<HTMLElement | null>
}) {
  return (
    <Dialog open={product !== null} onOpenChange={onOpenChange}>
      {product ? (
        <DialogContent
          className="max-w-3xl gap-0 p-0 sm:p-0"
          onCloseAutoFocus={(event) => {
            if (!returnFocus.current) return
            event.preventDefault()
            returnFocus.current.focus()
          }}
        >
          {/* key: a medida escolhida recomeça a cada produto */}
          <ProductDetails key={product.id} product={product} category={category} icon={icon} />
        </DialogContent>
      ) : null}
    </Dialog>
  )
}

function ProductDetails({
  product,
  category,
  icon,
}: {
  product: Product
  category: ProductCategory
  icon: LucideIcon
}) {
  const [size, setSize] = useState<string | null>(null)
  const sizesId = useId()

  return (
    <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <ProductImage
        product={product}
        icon={icon}
        sizes="(min-width: 768px) 360px, 100vw"
        className="aspect-[4/3] border-b border-apag-line md:aspect-auto md:min-h-full md:border-b-0 md:border-r"
      />
      <div className="flex flex-col p-6 sm:p-8">
        <ProductMeta product={product} />
        <DialogTitle className="mt-2 pr-8 text-xl leading-snug">{product.name}</DialogTitle>
        <DialogDescription className="mt-3">{product.description}</DialogDescription>

        {product.specs?.length ? (
          <div className="mt-6">
            <p className="text-label text-apag-slate">{ui.specsLabel}</p>
            <ul className="mt-2 border-t border-apag-line text-sm text-apag-ink">
              {product.specs.map((spec) => (
                <li key={spec} className="border-b border-apag-line py-2 leading-snug">
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {product.materials?.length ? (
          <p className="mt-4 text-sm text-apag-slate">
            <span className="font-semibold text-apag-ink">{ui.materialsLabel}: </span>
            {product.materials.join('; ')}
          </p>
        ) : null}

        {product.sizes?.length ? (
          <div className="mt-6">
            <p id={sizesId} className="text-label text-apag-slate">
              {ui.sizeLabel}
            </p>
            <div role="radiogroup" aria-labelledby={sizesId} className="mt-2 flex flex-wrap gap-2">
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
                      'rounded-sm border px-3 py-1.5 text-sm font-medium tabular-nums transition-colors',
                      checked
                        ? 'border-apag-ink bg-apag-ink text-white'
                        : 'border-apag-line-strong text-apag-ink hover:border-apag-ink',
                    )}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        <Button asChild className="mt-8 self-start">
          <a href={quoteHref(product, category, size)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {ui.quote}
            <span className="sr-only"> de {quoteItem(product, size)} pelo WhatsApp</span>
          </a>
        </Button>
      </div>
    </div>
  )
}
