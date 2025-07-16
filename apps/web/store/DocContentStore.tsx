import { create } from 'zustand'

interface DocContentState {
    docContent: string
    setDocContent: (content: string) => void
}

export const useDocContentStore = create<DocContentState>((set) => ({
    docContent: '',
    setDocContent: (content) => set({ docContent: content }),
}))
