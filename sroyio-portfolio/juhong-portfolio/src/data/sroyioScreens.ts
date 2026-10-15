export interface SroyioScreen {
  id: string
  category: string
  title: string
  description: string
  image?: string
}

export const placeholderScreens: SroyioScreen[] = [
  { id: 'main-01', category: 'Main', title: 'Main Screen', description: '도메인의 대표 화면이 들어갈 자리입니다.' },
  { id: 'main-02', category: 'Main', title: 'Main Detail', description: '대표 기능의 상세 화면이 들어갈 자리입니다.' },
  { id: 'detail-01', category: 'Detail', title: 'Feature Detail', description: '세부 기능 화면이 들어갈 자리입니다.' },
  { id: 'detail-02', category: 'Detail', title: 'Feature Flow', description: '업무 흐름을 보여주는 화면이 들어갈 자리입니다.' },
  { id: 'settings-01', category: 'Settings', title: 'Settings', description: '설정 화면이 들어갈 자리입니다.' },
  { id: 'etc-01', category: 'Etc', title: 'Additional Screen', description: '추가 화면이 들어갈 자리입니다.' },
]
