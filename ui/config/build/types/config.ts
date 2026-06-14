export interface BuildPaths {
    entry: string
    build: string
    src: string
    pages: string
    widgets: string
    entities: string
    features: string
    shared: string
    assets: string
}

export interface BuildOptions {
    mode: string
    paths: BuildPaths
    isDev: boolean
    port: number
}
