export declare namespace Gassma {
  class GassmaClient {
    constructor(id?: string);

    readonly sheets: GassmaSheet;
  }
}

export type GassmaSheet = {
  "スケジュール一覧": Gassmaスケジュール一覧Controller;
  "参加者": Gassma参加者Controller;
};

export class Gassmaスケジュール一覧Controller {
  constructor(sheetName: string, id?: string);

  changeSettings(
    startRowNumber: number,
    startColumnNumber: number,
    endColumnNumber: number
  ): void;
  createMany(createdData: Gassmaスケジュール一覧CreateManyData): CreateManyReturn;
  create(createdData: Gassmaスケジュール一覧CreateData): Gassmaスケジュール一覧CreateReturn;
  findFirst<T extends Gassmaスケジュール一覧FindData>(findData: T): Gassmaスケジュール一覧FindResult<T["select"]>;
  findMany<T extends Gassmaスケジュール一覧FindManyData>(findData: T): Gassmaスケジュール一覧FindResult<T["select"]>[];
  updateMany(updateData: Gassmaスケジュール一覧UpdateData): UpdateManyReturn;
  upsertMany(upsertData: Gassmaスケジュール一覧UpsertData): UpsertManyReturn;
  deleteMany(deleteData: Gassmaスケジュール一覧DeleteData): DeleteManyReturn;
  aggregate<T extends Gassmaスケジュール一覧AggregateData>(aggregateData: T): Gassmaスケジュール一覧AggregateResult<T>;
  count(coutData: Gassmaスケジュール一覧CountData): number;
  groupBy<T extends Gassmaスケジュール一覧GroupByData>(groupByData: T): Gassmaスケジュール一覧GroupByResult<T>[];
}

export class Gassma参加者Controller {
  constructor(sheetName: string, id?: string);

  changeSettings(
    startRowNumber: number,
    startColumnNumber: number,
    endColumnNumber: number
  ): void;
  createMany(createdData: Gassma参加者CreateManyData): CreateManyReturn;
  create(createdData: Gassma参加者CreateData): Gassma参加者CreateReturn;
  findFirst<T extends Gassma参加者FindData>(findData: T): Gassma参加者FindResult<T["select"]>;
  findMany<T extends Gassma参加者FindManyData>(findData: T): Gassma参加者FindResult<T["select"]>[];
  updateMany(updateData: Gassma参加者UpdateData): UpdateManyReturn;
  upsertMany(upsertData: Gassma参加者UpsertData): UpsertManyReturn;
  deleteMany(deleteData: Gassma参加者DeleteData): DeleteManyReturn;
  aggregate<T extends Gassma参加者AggregateData>(aggregateData: T): Gassma参加者AggregateResult<T>;
  count(coutData: Gassma参加者CountData): number;
  groupBy<T extends Gassma参加者GroupByData>(groupByData: T): Gassma参加者GroupByResult<T>[];
}

type ManyReturn = {
  count: number;
};

export type CreateManyReturn = ManyReturn;
export type UpdateManyReturn = ManyReturn;
export type DeleteManyReturn = ManyReturn;
export type UpsertManyReturn = ManyReturn;

export type Gassmaスケジュール一覧Use = {
  "イベント名": string;
  "集合時間"?: Date;
  "備考"?: string;
};

export type Gassma参加者Use = {
  "イベント名": string;
  "参加者名": string;
};

export type Gassmaスケジュール一覧CreateData = {
  data: Gassmaスケジュール一覧Use;
};

export type Gassma参加者CreateData = {
  data: Gassma参加者Use;
};

export type Gassmaスケジュール一覧CreateManyData = {
  data: Gassmaスケジュール一覧Use[];
};

export type Gassma参加者CreateManyData = {
  data: Gassma参加者Use[];
};

export type Gassmaスケジュール一覧イベント名FilterConditions = {
  equals?: string;
  not?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
};

export type Gassmaスケジュール一覧集合時間FilterConditions = {
  equals?: Date | null;
  not?: Date | null;
  in?: Date[];
  notIn?: Date[];
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
};

export type Gassmaスケジュール一覧備考FilterConditions = {
  equals?: string | null;
  not?: string | null;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
};

export type Gassma参加者イベント名FilterConditions = {
  equals?: string;
  not?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
};

export type Gassma参加者参加者名FilterConditions = {
  equals?: string;
  not?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
};

export type Gassmaスケジュール一覧WhereUse = {
  "イベント名"?: string | Gassmaスケジュール一覧イベント名FilterConditions;
  "集合時間"?: Date | null | Gassmaスケジュール一覧集合時間FilterConditions;
  "備考"?: string | null | Gassmaスケジュール一覧備考FilterConditions;

  AND?: Gassmaスケジュール一覧WhereUse[] | Gassmaスケジュール一覧WhereUse;
  OR?: Gassmaスケジュール一覧WhereUse[];
  NOT?: Gassmaスケジュール一覧WhereUse[] | Gassmaスケジュール一覧WhereUse;
};

export type Gassma参加者WhereUse = {
  "イベント名"?: string | Gassma参加者イベント名FilterConditions;
  "参加者名"?: string | Gassma参加者参加者名FilterConditions;

  AND?: Gassma参加者WhereUse[] | Gassma参加者WhereUse;
  OR?: Gassma参加者WhereUse[];
  NOT?: Gassma参加者WhereUse[] | Gassma参加者WhereUse;
};

export type Gassmaスケジュール一覧イベント名HavingCore = {
  _avg?: Gassmaスケジュール一覧イベント名FilterConditions;
  _count?: Gassmaスケジュール一覧イベント名FilterConditions;
  _max?: Gassmaスケジュール一覧イベント名FilterConditions;
  _min?: Gassmaスケジュール一覧イベント名FilterConditions;
  _sum?: Gassmaスケジュール一覧イベント名FilterConditions;
} & Gassmaスケジュール一覧イベント名FilterConditions;

export type Gassmaスケジュール一覧集合時間HavingCore = {
  _avg?: Gassmaスケジュール一覧集合時間FilterConditions;
  _count?: Gassmaスケジュール一覧集合時間FilterConditions;
  _max?: Gassmaスケジュール一覧集合時間FilterConditions;
  _min?: Gassmaスケジュール一覧集合時間FilterConditions;
  _sum?: Gassmaスケジュール一覧集合時間FilterConditions;
} & Gassmaスケジュール一覧集合時間FilterConditions;

export type Gassmaスケジュール一覧備考HavingCore = {
  _avg?: Gassmaスケジュール一覧備考FilterConditions;
  _count?: Gassmaスケジュール一覧備考FilterConditions;
  _max?: Gassmaスケジュール一覧備考FilterConditions;
  _min?: Gassmaスケジュール一覧備考FilterConditions;
  _sum?: Gassmaスケジュール一覧備考FilterConditions;
} & Gassmaスケジュール一覧備考FilterConditions;

export type Gassma参加者イベント名HavingCore = {
  _avg?: Gassma参加者イベント名FilterConditions;
  _count?: Gassma参加者イベント名FilterConditions;
  _max?: Gassma参加者イベント名FilterConditions;
  _min?: Gassma参加者イベント名FilterConditions;
  _sum?: Gassma参加者イベント名FilterConditions;
} & Gassma参加者イベント名FilterConditions;

export type Gassma参加者参加者名HavingCore = {
  _avg?: Gassma参加者参加者名FilterConditions;
  _count?: Gassma参加者参加者名FilterConditions;
  _max?: Gassma参加者参加者名FilterConditions;
  _min?: Gassma参加者参加者名FilterConditions;
  _sum?: Gassma参加者参加者名FilterConditions;
} & Gassma参加者参加者名FilterConditions;

export type Gassmaスケジュール一覧HavingUse = {
  "イベント名"?: string | Gassmaスケジュール一覧イベント名HavingCore;
  "集合時間"?: Date | null | Gassmaスケジュール一覧集合時間HavingCore;
  "備考"?: string | null | Gassmaスケジュール一覧備考HavingCore;

  AND?: Gassmaスケジュール一覧HavingUse[] | Gassmaスケジュール一覧HavingUse;
  OR?: Gassmaスケジュール一覧HavingUse[];
  NOT?: Gassmaスケジュール一覧HavingUse[] | Gassmaスケジュール一覧HavingUse;
};

export type Gassma参加者HavingUse = {
  "イベント名"?: string | Gassma参加者イベント名HavingCore;
  "参加者名"?: string | Gassma参加者参加者名HavingCore;

  AND?: Gassma参加者HavingUse[] | Gassma参加者HavingUse;
  OR?: Gassma参加者HavingUse[];
  NOT?: Gassma参加者HavingUse[] | Gassma参加者HavingUse;
};

export type Gassmaスケジュール一覧FindData = {
  where?: Gassmaスケジュール一覧WhereUse;
  select?: Gassmaスケジュール一覧Select;
  orderBy?: Gassmaスケジュール一覧OrderBy;
  take?: number;
  skip?: number;
  distinct?: "イベント名" | "集合時間" | "備考" | ("イベント名" | "集合時間" | "備考")[]
};

export type Gassma参加者FindData = {
  where?: Gassma参加者WhereUse;
  select?: Gassma参加者Select;
  orderBy?: Gassma参加者OrderBy;
  take?: number;
  skip?: number;
  distinct?: "イベント名" | "参加者名" | ("イベント名" | "参加者名")[]
};

export type Gassmaスケジュール一覧FindManyData = Gassmaスケジュール一覧FindData;    

export type Gassma参加者FindManyData = Gassma参加者FindData;    

export type Gassmaスケジュール一覧UpdateData = {
  where?: Gassmaスケジュール一覧WhereUse;
  data: Gassmaスケジュール一覧Use;
};

export type Gassma参加者UpdateData = {
  where?: Gassma参加者WhereUse;
  data: Gassma参加者Use;
};

export type Gassmaスケジュール一覧UpsertData = {
  where: Gassmaスケジュール一覧WhereUse;
  update: Gassmaスケジュール一覧Use;
  data: Gassmaスケジュール一覧Use;
};

export type Gassma参加者UpsertData = {
  where: Gassma参加者WhereUse;
  update: Gassma参加者Use;
  data: Gassma参加者Use;
};

export type Gassmaスケジュール一覧DeleteData = {
  where: Gassmaスケジュール一覧WhereUse;
};

export type Gassma参加者DeleteData = {
  where: Gassma参加者WhereUse;
};

export type Gassmaスケジュール一覧AggregateData = {
  where?: Gassmaスケジュール一覧WhereUse;
  orderBy?: Gassmaスケジュール一覧OrderBy;
  take?: number;
  skip?: number;
  _avg?: Gassmaスケジュール一覧Select;
  _count?: Gassmaスケジュール一覧Select;
  _max?: Gassmaスケジュール一覧Select;
  _min?: Gassmaスケジュール一覧Select;
  _sum?: Gassmaスケジュール一覧Select;
};

export type Gassma参加者AggregateData = {
  where?: Gassma参加者WhereUse;
  orderBy?: Gassma参加者OrderBy;
  take?: number;
  skip?: number;
  _avg?: Gassma参加者Select;
  _count?: Gassma参加者Select;
  _max?: Gassma参加者Select;
  _min?: Gassma参加者Select;
  _sum?: Gassma参加者Select;
};

export type Gassmaスケジュール一覧GroupByData = Gassmaスケジュール一覧AggregateData & {
  by: "イベント名" | "集合時間" | "備考" | ("イベント名" | "集合時間" | "備考")[];
  having?: Gassmaスケジュール一覧HavingUse;
};

export type Gassma参加者GroupByData = Gassma参加者AggregateData & {
  by: "イベント名" | "参加者名" | ("イベント名" | "参加者名")[];
  having?: Gassma参加者HavingUse;
};

export type Gassmaスケジュール一覧OrderBy = {
  "イベント名"?: "asc" | "desc";
  "集合時間"?: "asc" | "desc";
  "備考"?: "asc" | "desc";
};

export type Gassma参加者OrderBy = {
  "イベント名"?: "asc" | "desc";
  "参加者名"?: "asc" | "desc";
};

export type Gassmaスケジュール一覧Select = {
  "イベント名"?: true;
  "集合時間"?: true;
  "備考"?: true;
};

export type Gassma参加者Select = {
  "イベント名"?: true;
  "参加者名"?: true;
};

export type Gassmaスケジュール一覧CountData = {
  where?: Gassmaスケジュール一覧WhereUse;
  orderBy?: Gassmaスケジュール一覧OrderBy;
  take?: number;
  skip?: number;
};

export type Gassma参加者CountData = {
  where?: Gassma参加者WhereUse;
  orderBy?: Gassma参加者OrderBy;
  take?: number;
  skip?: number;
};

export type Gassmaスケジュール一覧CreateReturn = {
 "イベント名": string;
 "集合時間": Date | null;
 "備考": string | null;
};

export type Gassma参加者CreateReturn = {
 "イベント名": string;
 "参加者名": string;
};

export type Gassmaスケジュール一覧DefaultFindResult = Gassmaスケジュール一覧CreateReturn;

export type Gassma参加者DefaultFindResult = Gassma参加者CreateReturn;

export type Gassmaスケジュール一覧FindResult<T> = T extends undefined
  ? Gassmaスケジュール一覧DefaultFindResult
  : T extends Gassmaスケジュール一覧Select
    ? {
        [K in keyof T as T[K] extends true
          ? K & keyof Gassmaスケジュール一覧DefaultFindResult
          : never]: Gassmaスケジュール一覧DefaultFindResult[K & keyof Gassmaスケジュール一覧DefaultFindResult];
      }
    : Gassmaスケジュール一覧DefaultFindResult;

export type Gassma参加者FindResult<T> = T extends undefined
  ? Gassma参加者DefaultFindResult
  : T extends Gassma参加者Select
    ? {
        [K in keyof T as T[K] extends true
          ? K & keyof Gassma参加者DefaultFindResult
          : never]: Gassma参加者DefaultFindResult[K & keyof Gassma参加者DefaultFindResult];
      }
    : Gassma参加者DefaultFindResult;

export type Gassmaスケジュール一覧AggregateBaseReturn = {
  "イベント名": string
  "集合時間": Date
  "備考": string
};

export type Gassma参加者AggregateBaseReturn = {
  "イベント名": string
  "参加者名": string
};

export type Gassmaスケジュール一覧AggregateField<T, K extends string> = T extends undefined
  ? never
  : K extends "_count"
    ? { [P in keyof T as T[P] extends true ? P : never]: number }
    : {
        [P in keyof T as T[P] extends true
          ? P & keyof Gassmaスケジュール一覧AggregateBaseReturn
          : never]: Gassmaスケジュール一覧AggregateBaseReturn[P & keyof Gassmaスケジュール一覧AggregateBaseReturn];
      };

export type Gassma参加者AggregateField<T, K extends string> = T extends undefined
  ? never
  : K extends "_count"
    ? { [P in keyof T as T[P] extends true ? P : never]: number }
    : {
        [P in keyof T as T[P] extends true
          ? P & keyof Gassma参加者AggregateBaseReturn
          : never]: Gassma参加者AggregateBaseReturn[P & keyof Gassma参加者AggregateBaseReturn];
      };

export type Gassmaスケジュール一覧AggregateResult<T extends Gassmaスケジュール一覧AggregateData> = {
  [K in keyof T as K extends "_avg" | "_count" | "_max" | "_min" | "_sum"
    ? T[K] extends undefined
      ? never
      : K
    : never]: K extends string ? Gassmaスケジュール一覧AggregateField<T[K], K> : never;
};

export type Gassma参加者AggregateResult<T extends Gassma参加者AggregateData> = {
  [K in keyof T as K extends "_avg" | "_count" | "_max" | "_min" | "_sum"
    ? T[K] extends undefined
      ? never
      : K
    : never]: K extends string ? Gassma参加者AggregateField<T[K], K> : never;
};

export type Gassmaスケジュール一覧GroupByBaseReturn = Gassmaスケジュール一覧CreateReturn;

export type Gassma参加者GroupByBaseReturn = Gassma参加者CreateReturn;

export type Gassmaスケジュール一覧GroupByKeyOfBaseReturn = keyof Gassmaスケジュール一覧GroupByBaseReturn;

export type Gassma参加者GroupByKeyOfBaseReturn = keyof Gassma参加者GroupByBaseReturn;

export type Gassmaスケジュール一覧ByField<T extends Gassmaスケジュール一覧GroupByKeyOfBaseReturn | Gassmaスケジュール一覧GroupByKeyOfBaseReturn[]> =
  T extends Gassmaスケジュール一覧GroupByKeyOfBaseReturn[]
    ? {
        [K in T[number]]: Gassmaスケジュール一覧GroupByBaseReturn[K & keyof Gassmaスケジュール一覧GroupByBaseReturn];
      }
    : T extends keyof Gassmaスケジュール一覧GroupByBaseReturn
      ? { [K in T]: Gassmaスケジュール一覧GroupByBaseReturn[K] }
      : never;

export type Gassma参加者ByField<T extends Gassma参加者GroupByKeyOfBaseReturn | Gassma参加者GroupByKeyOfBaseReturn[]> =
  T extends Gassma参加者GroupByKeyOfBaseReturn[]
    ? {
        [K in T[number]]: Gassma参加者GroupByBaseReturn[K & keyof Gassma参加者GroupByBaseReturn];
      }
    : T extends keyof Gassma参加者GroupByBaseReturn
      ? { [K in T]: Gassma参加者GroupByBaseReturn[K] }
      : never;

export type Gassmaスケジュール一覧GroupByResult<T extends Gassmaスケジュール一覧GroupByData> = Gassmaスケジュール一覧ByField<T["by"]> & {
  [K in keyof T as K extends "_avg" | "_count" | "_max" | "_min" | "_sum"
    ? T[K] extends undefined
      ? never
      : K
    : never]: K extends string ? Gassmaスケジュール一覧AggregateField<T[K], K> : never;
};

export type Gassma参加者GroupByResult<T extends Gassma参加者GroupByData> = Gassma参加者ByField<T["by"]> & {
  [K in keyof T as K extends "_avg" | "_count" | "_max" | "_min" | "_sum"
    ? T[K] extends undefined
      ? never
      : K
    : never]: K extends string ? Gassma参加者AggregateField<T[K], K> : never;
};
