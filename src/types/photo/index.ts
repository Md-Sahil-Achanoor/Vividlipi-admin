export interface PhotoResponse {
  id: string
  name: string
  pic: string
  album: string
}

export interface PhotoPayload {
  name: string
  pic: string
  album: string
}

export interface PhotoQuery {
  id?: string
  name?: string
  album?: string
}

export interface PhotoState {
  selectedPhoto: PhotoResponse | null
  singlePhoto: {
    name: string
    pic: string
    album: string
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
