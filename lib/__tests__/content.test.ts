/* eslint-disable @typescript-eslint/no-explicit-any */

describe('content layer', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('getTeam returns blob data when available', async () => {
    const mockReadJson = jest.fn().mockResolvedValueOnce([
      {
        slug: 'test',
        name: { fa: 'تست', en: 'Test' },
        title: { fa: '', en: '' },
        bio: { fa: '', en: '' },
        fullBio: { fa: '', en: '' },
        photo: '',
        specializations: { fa: [], en: [] },
      },
    ])

    jest.doMock('../blob', () => ({
      readJson: mockReadJson,
    }))

    const { getTeam } = await import('../content')
    const result = await getTeam()
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('test')
  })

  test('getTeam falls back to static data when blob returns null', async () => {
    const mockReadJson = jest.fn().mockResolvedValueOnce(null)

    jest.doMock('../blob', () => ({
      readJson: mockReadJson,
    }))

    const { getTeam } = await import('../content')
    const result = await getTeam()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  test('getBlog returns blob data when available', async () => {
    const mockReadJson = jest.fn().mockResolvedValueOnce([
      { slug: 'post-1', title: { fa: 'عنوان', en: 'Title' } },
    ])

    jest.doMock('../blob', () => ({
      readJson: mockReadJson,
    }))

    const { getBlog } = await import('../content')
    const result = await getBlog()
    expect(result[0].slug).toBe('post-1')
  })
})
