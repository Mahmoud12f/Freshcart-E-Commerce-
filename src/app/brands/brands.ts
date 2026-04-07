export interface AllBrandsResponse {
  results: number
  metadata: Metadata
  data: AllBrandsData[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface AllBrandsData {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
