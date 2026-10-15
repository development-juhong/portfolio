export interface SroyioDomain {
  id: string
  number: string
  name: string
  category: string
  description: string
  features: string[]
}

export const sroyioDomains: SroyioDomain[] = [
  { id: 'messenger', number: '01', name: 'Messenger', category: 'Communication', description: '사용자 간 메시징과 대화 기능', features: ['Direct Message', 'Group Chat', 'Participants', 'Mentions', 'Attachments', 'Read State', 'Search', 'Notifications'] },
  { id: 'channel', number: '02', name: 'Channel', category: 'Collaboration', description: '채널 기반 협업과 팀 커뮤니케이션', features: ['Channel', 'Members', 'Posts', 'Threads', 'Mentions', 'Attachments'] },
  { id: 'mail', number: '03', name: 'Mail', category: 'Communication', description: '내부 및 외부 메일 기능', features: ['Internal Mail', 'External Mail', 'Inbox', 'Sent', 'Draft', 'Trash', 'Reply', 'Forward', 'Attachments'] },
  { id: 'calendar', number: '04', name: 'Calendar', category: 'Collaboration', description: '일정 및 업무 스케줄 관리', features: ['Personal Schedule', 'Team Schedule', 'Invitation', 'Reminder', 'Repeat', 'Sharing'] },
  { id: 'file', number: '05', name: 'File', category: 'Content', description: '공통 파일 및 첨부파일 관리', features: ['Upload', 'Download', 'Metadata', 'Reference', 'Lifecycle', 'Permission'] },
  { id: 'note', number: '06', name: 'Note', category: 'Collaboration', description: '개인 및 협업 노트', features: ['Note', 'Folder', 'Sharing', 'Search', 'Pin'] },
  { id: 'organization', number: '07', name: 'Organization', category: 'Platform', description: '사용자 및 조직 정보 관리', features: ['User', 'Department', 'Position', 'Organization Tree', 'Search', 'Permission'] },
  { id: 'notification', number: '08', name: 'Notification', category: 'Platform', description: '통합 알림과 사용자 Inbox', features: ['Inbox', 'Mention', 'Assignment', 'Reminder', 'Read State', 'Retry'] },
  { id: 'board', number: '09', name: 'Board', category: 'Content', description: '게시판 및 콘텐츠 공유', features: ['Board', 'Post', 'Comment', 'Attachment', 'Permission'] },
  { id: 'apps', number: '10', name: 'Apps', category: 'Platform', description: '업무용 App 확장 플랫폼', features: ['App', 'Deployment', 'Approval', 'Permission', 'Integration'] },
  { id: 'admin', number: '11', name: 'Admin', category: 'Platform', description: '서비스 및 권한 관리', features: ['Environment', 'User Permission', 'Department Permission', 'Policy', 'Audit', 'Configuration', 'Deployment'] },
  { id: 'ai', number: '12', name: 'AI', category: 'Intelligence', description: 'AI와 RAG 기반 업무 지원', features: ['Chat', 'RAG', 'Search', 'Embedding', 'Local LLM', 'Context'] },
  { id: 'integration', number: '13', name: 'Integration', category: 'Intelligence', description: '외부 업무 시스템 연계', features: ['Connector', 'Bridge', 'ERP', 'Groupware', 'MIS', 'External API'] },
]
