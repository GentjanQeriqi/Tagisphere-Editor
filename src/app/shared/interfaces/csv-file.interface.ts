export interface CsvFilePayload{
    project:number
    file:File|string
    delimiter?:string
}

export interface HeaderCsvFile{
    csvHeader:string
    dbColumn:string
}

export interface CsvFile  {
    id:number
    project:number
    file:string
    rows_count_csv:number
    rows_count_db:number
    created_at:string
    updated_at:string
    delimiter:string
    headers:Array<HeaderCsvFile>
}

export interface CsvGeotagSchema {
    label: string,
    category: string,
    subcategory: string,
    description: string,
    lat: string,
    lng: string
    [key:string]:string
}

export interface CsvConfigurationPayload{
    csv_file:number
    srid:number
    geotag_field_map:CsvGeotagSchema
}

export interface CsvConfiguration extends CsvConfigurationPayload{
    created_at:string
    updated_at:string
    user:number
    tags:Array<number>
}
