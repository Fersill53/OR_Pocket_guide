export type BacktablePhotoDto = {
    id: string,
    name: string,
    contentType: string,
    url: string;
};

export type BacktableSetup = {
    id: string;

    caseName: string;
    surgeonName: string;

    gownsAndGloves: string[];
    drapes: string[];
    instrumentTrays: string[];
    medications: string[];

    photos: BacktablePhotoDto[];

    createdAt?: string;
    updatedAt?: string;

};