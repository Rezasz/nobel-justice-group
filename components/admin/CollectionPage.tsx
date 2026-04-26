'use client'
import { useState, useEffect, useCallback } from 'react'
import type { CollectionSchema } from './schemas'
import EditModal from './EditModal'

interface Props {
  collection: string
  schema: CollectionSchema
}

export default function CollectionPage({ collection, schema }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<Record<string, any>[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editing, setEditing] = useState<Record<string, any> | null | undefined>(undefined)
  // undefined = modal closed, null = new item, object = edit existing
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/${collection}`)
      if (!res.ok) throw new Error('Failed to load')
      setItems(await res.json())
    } catch {
      setError('خطا در بارگذاری داده‌ها')
    } finally {
      setLoading(false)
    }
  }, [collection])

  useEffect(() => { load() }, [load])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function save(item: Record<string, any>) {
    const isNew = editing === null
    const updated = isNew
      ? [...items, item]
      : items.map((i) => {
          const idKey = schema.fields[0].key
          return i[idKey] === item[idKey] ? item : i
        })
    const res = await fetch(`/api/admin/${collection}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    if (!res.ok) throw new Error('Save failed')
    setItems(updated)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function deleteItem(item: Record<string, any>) {
    const idKey = schema.fields[0].key
    const updated = items.filter((i) => i[idKey] !== item[idKey])
    await fetch(`/api/admin/${collection}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setItems(updated)
    setDeleteConfirm(null)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getDisplayValue(item: Record<string, any>): string {
    const val = item[schema.displayField]
    if (typeof val === 'object' && val?.fa) return val.fa
    return String(val ?? '')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getImageUrl(item: Record<string, any>): string {
    if (!schema.imageField) return ''
    return item[schema.imageField] ?? ''
  }

  if (loading) {
    return (
      <div className="text-cream/50 text-center py-20">در حال بارگذاری...</div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-cream font-morabba text-2xl">{schema.label}</h1>
        <button
          onClick={() => setEditing(null)}
          className="bg-gold text-navy font-bold rounded-lg px-4 py-2 text-sm hover:bg-gold-light transition-colors"
        >
          + {schema.addLabel}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => {
          const idKey = schema.fields[0].key
          const id = item[idKey]
          const imageUrl = getImageUrl(item)
          const displayVal = getDisplayValue(item)

          return (
            <div
              key={id}
              className="bg-navy-light border border-white/10 rounded-xl overflow-hidden hover:border-gold/30 transition-colors"
            >
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={displayVal}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              )}
              <div className="p-3">
                <p className="text-cream text-sm font-bold truncate mb-1">{displayVal}</p>
                <p className="text-cream/40 text-xs font-mono truncate mb-3">{id}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(item)}
                    className="flex-1 text-xs bg-white/5 hover:bg-white/10 text-cream rounded px-2 py-1.5 transition-colors"
                  >
                    ویرایش
                  </button>
                  {deleteConfirm === id ? (
                    <>
                      <button
                        onClick={() => deleteItem(item)}
                        className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded px-2 py-1.5 transition-colors"
                      >
                        تایید حذف
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="text-xs text-cream/40 hover:text-cream rounded px-2 py-1.5"
                      >
                        لغو
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(id)}
                      className="text-xs text-cream/40 hover:text-red-400 rounded px-2 py-1.5 transition-colors"
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {items.length === 0 && !loading && (
        <div className="text-center py-20 text-cream/30">
          <p className="text-4xl mb-3">📭</p>
          <p>هیچ موردی یافت نشد. اولین مورد را اضافه کنید.</p>
        </div>
      )}

      {editing !== undefined && (
        <EditModal
          schema={schema}
          initial={editing}
          onSave={save}
          onClose={() => setEditing(undefined)}
        />
      )}
    </div>
  )
}
