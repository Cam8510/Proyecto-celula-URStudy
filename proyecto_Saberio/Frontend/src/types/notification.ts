export interface AppNotification {
  id: number
  type: 'request' | 'success' | 'warning'
  title: string
  text: string
  time: string
}