import { LngLatLike } from "mapbox-gl"

export interface Tags {
    id: number
    distance: number
    entries: Entry[]
    color_info: string
    category_info: CategoryInfo
    line_width: number
    polygon_fill: boolean
    name: string
    geo_type: string
    location: Location
    centroid: Centroid
    offset: number
    description: string
    created_at: string
    updated_at: string
    visit_count: number
    is_visible: boolean
    score: number
    ref_id: string
    additional_data: AdditionalData
    icon: any
    color: number
    project: number
    category: number
    parent: number
    added_by: number
    children: string[]
  }
  
  export interface Entry {
    id: number
    name: string
    hyperlink: string
    entry_type: string
    entry_value: string
  }
  
  export interface CategoryInfo {
    id: number
    name: string
    project: number
    color_info: ColorInfo
    parent: string
  }
  
  export interface ColorInfo {
    hex: string
  }
  
  export interface Location {
    type: string
    coordinates: LngLatLike
  }
  
  export interface Centroid {
    type: string
    coordinates: number[]
  }
  
  export interface AdditionalData {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
  }
  

  export interface TagCategory {
    id: number
    name: string
    project: number
    color_info: any
    parent: Parent,
    level: number,
    children: TagCategory[] 
  }
  
  export interface Parent {
    id: number
    name: string
    project: number
    color_info: ColorInfo
    parent: any
  }
  
  export interface ColorInfo {
    id: number
    hex: string
  }
  