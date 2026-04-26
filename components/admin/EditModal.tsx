'use client'
import { useState, useEffect } from 'react'
import type { CollectionSchema } from './schemas'
import BilingualField from './BilingualField'
import ImageUpload from './ImageUpload'

interface Props {
  schema: CollectionSchema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial: Record<string, any> | null  // null = new item
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (item: Record<string, any>) => Promise<void>
  onClose: () => void
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u0600-\u06FF\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function EditModal({ schema, initial, onSave, onClose }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const isNew = initial === null

  useEffect(() => {
    if (initial) {
      setForm(JSON.parse(JSON.stringify(initial)))
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const empty: Record<string, any> = {}
      for (const field of schema.fields) {
        if (field.bilingual) {
          empty[field.key] = { fa: '', en: '' }
        } else if (field.type === 'tags') {
          empty[field.key] = { fa: '', en: '' }
        } else {
          empty[field.key] = ''
        }
      }
      setForm(empty)
    }
  }, [initial, schema])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function setBilingual(key: string, lang: 'fa' | 'en', value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: { ...(prev[key] ?? {}), [lang]: value },
    }))
  }

  function handleNameFaChange(key: string, value: string) {
    setBilingual(key, 'fa', value)
    if (isNew) {
      const slugField = schema.fields.find((f) => f.type === 'slug')
      if (slugField && !form[slugField.key]) {
        setField(slugField.key, slugify(value))
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const processed = { ...form }
    for (const field of schema.fields) {
      if (field.type === 'tags') {
        processed[field.key] = {
          fa: (form[field.key]?.fa ?? '')
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean),
          en: (form[field.key]?.en ?? '')
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean),
        }
      }
    }
    try {
      await onSave(processed)
      onClose()
    } catch {
      setError('خطا در ذخیره. دوباره تلاش کنید.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-navy-light border border-white/10 rounded-xl w-full max-w-3xl my-8">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-cream font-morabba text-lg">
            {isNew ? schema.addLabel : 'ویرایش'}
          </h2>
          <button onClick={onClose} className="text-cream/50 hover:text-cream text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4" dir="rtl">
          {schema.fields.map((field) => {
            if (field.bilingual && field.type !== 'tags') {
              const isNameField = field.key === 'name' || field.key === 'title' || field.key === 'question' || field.key === 'city'
              return (
                <BilingualField
                  key={field.key}
                  label={field.label}
                  faValue={form[field.key]?.fa ?? ''}
                  enValue={form[field.key]?.en ?? ''}
                  onFaChange={(v) =>
                    isNameField && isNew
                      ? handleNameFaChange(field.key, v)
                      : setBilingual(field.key, 'fa', v)
                  }
                  onEnChange={(v) => setBilingual(field.key, 'en', v)}
                  type={field.type === 'textarea' ? 'textarea' : 'input'}
                  required={field.required}
                />
              )
            }

            if (field.type === 'tags') {
              return (
                <div key={field.key}>
                  <BilingualField
                    label={`${field.label} (جداسازی با کاما)`}
                    faValue={
                      Array.isArray(form[field.key]?.fa)
                        ? (form[field.key].fa as string[]).join(', ')
                        : (form[field.key]?.fa ?? '')
                    }
                    enValue={
                      Array.isArray(form[field.key]?.en)
                        ? (form[field.key].en as string[]).join(', ')
                        : (form[field.key]?.en ?? '')
                    }
                    onFaChange={(v) => setBilingual(field.key, 'fa', v)}
                    onEnChange={(v) => setBilingual(field.key, 'en', v)}
                    required={field.required}
                  />
                </div>
              )
            }

            if (field.type === 'image') {
              return (
                <div key={field.key}>
                  <p className="text-cream/70 text-xs mb-2">{field.label}</p>
                  <ImageUpload
                    value={form[field.key] ?? ''}
                    folder={field.imageFolder ?? 'misc'}
                    onChange={(url) => setField(field.key, url)}
                  />
                </div>
              )
            }

            if (field.type === 'slug') {
              return (
                <div key={field.key}>
                  <label className="block text-cream/70 text-xs mb-1">
                    {field.label}
                    {field.required && <span className="text-gold ms-1">*</span>}
                  </label>
                  <input
                    type="text"
                    value={form[field.key] ?? ''}
                    onChange={(e) => setField(field.key, e.target.value)}
                    className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold focus:outline-none font-mono"
                    dir="ltr"
                    required={field.required}
                  />
                </div>
              )
            }

            // text, date
            return (
              <div key={field.key}>
                <label className="block text-cream/70 text-xs mb-1">
                  {field.label}
                  {field.required && <span className="text-gold ms-1">*</span>}
                </label>
                <input
                  type={field.type === 'date' ? 'date' : 'text'}
                  value={form[field.key] ?? ''}
                  onChange={(e) => setField(field.key, e.target.value)}
                  className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold focus:outline-none"
                  dir={field.type === 'date' ? 'ltr' : undefined}
                  required={field.required}
                />
              </div>
            )
          })}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-gold text-navy font-bold rounded-lg px-6 py-2 hover:bg-gold-light disabled:opacity-50 transition-colors"
            >
              {saving ? 'در حال ذخیره...' : 'ذخیره'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-cream/60 hover:text-cream px-4 py-2 text-sm"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
