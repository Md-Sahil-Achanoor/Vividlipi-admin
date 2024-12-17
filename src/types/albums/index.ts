export interface AlbumResponse {
    id: string
    title: string
    description: string
    cover: string
  }
  
  export interface AlbumPayload {
    title: string
    description: string
    cover: string
  }
  
  export interface AlbumQuery {
    id?: string
    title?: string
  }
  
  export interface AlbumState {
    selectedAlbum: AlbumResponse | null
    singleAlbum: {
      title: string
      description: string
      cover: string
    } | null
  }
  
  export interface ApiResponse<T> {
    status: number
    message: string
    data: T
  }
  
  export interface ManagePayload<T> {
    id?: string
    data: T
    options?: any
  }
  
  export interface ManageQuery<T> {
    query: T
  }
  