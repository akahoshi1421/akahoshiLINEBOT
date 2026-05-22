export namespace Gassma {
  type RelationsConfig = Record<string, Record<string, unknown>>;

  type NumberOperation = {
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  type SortOrderInput = {
    sort: "asc" | "desc";
    nulls?: "first" | "last";
  };

  type TrueKeys<T> = { [K in keyof T]: T[K] extends true ? K : never }[keyof T];
  type FalseKeys<T> = { [K in keyof T]: T[K] extends false ? K : never }[keyof T];
  type ResolveOmitKeys<GO, QO> = Exclude<TrueKeys<GO>, FalseKeys<QO>> | TrueKeys<QO>;

  type ManyReturn = {
    count: number;
  };

  type CreateManyReturn = ManyReturn;
  type UpdateManyReturn = ManyReturn;
  type DeleteManyReturn = ManyReturn;

  interface GassmaClientMap {}

  class GassmaClient<T extends keyof GassmaClientMap> {
    constructor(idOrOptions?: string | GassmaClientMap[T]["options"]);
  }

  class FieldRef {
    readonly modelName: string;
    readonly name: string;
    constructor(modelName: string, name: string);
  }

  class GassmaSkipNegativeError extends Error {
    constructor(value: number);
  }
  class GassmaLimitNegativeError extends Error {
    constructor(value: number);
  }
  class NotFoundError extends Error {
    constructor();
  }
  class GassmaFindSelectOmitConflictError extends Error {
    constructor();
  }
  class GassmaInValidColumnValueError extends Error {
    constructor();
  }
  class GassmaGroupByHavingDontWriteByError extends Error {
    constructor();
  }
  class GassmaAggregateMaxError extends Error {
    constructor();
  }
  class GassmaAggregateMinError extends GassmaAggregateMaxError {
    constructor();
  }
  class GassmaAggregateSumError extends GassmaAggregateMaxError {
    constructor();
  }
  class GassmaAggregateAvgError extends GassmaAggregateMaxError {
    constructor();
  }
  class GassmaAggregateTypeError extends Error {
    constructor();
  }
  class GassmaAggregateSumTypeError extends Error {
    constructor();
  }
  class GassmaAggregateAvgTypeError extends GassmaAggregateSumTypeError {
    constructor();
  }
  class RelationSheetNotFoundError extends Error {
    constructor(sheetName: string);
  }
  class RelationMissingPropertyError extends Error {
    constructor(sheetName: string, relationName: string, property: string);
  }
  class RelationInvalidPropertyTypeError extends Error {
    constructor(sheetName: string, relationName: string, property: string, expectedType: string);
  }
  class RelationInvalidTypeError extends Error {
    constructor(sheetName: string, relationName: string, value: string);
  }
  class RelationColumnNotFoundError extends Error {
    constructor(sheetName: string, columnName: string);
  }
  class IncludeWithoutRelationsError extends Error {
    constructor();
  }
  class IncludeInvalidOptionTypeError extends Error {
    constructor(relationName: string, option: string, expectedType: string);
  }
  class IncludeSelectOmitConflictError extends Error {
    constructor(relationName: string);
  }
  class IncludeSelectIncludeConflictError extends Error {
    constructor(relationName: string);
  }
  class WhereRelationInvalidFilterError extends Error {
    constructor(relationName: string, relationType: string, filterType: string);
  }
  class WhereRelationWithoutContextError extends Error {
    constructor();
  }
  class RelationOnDeleteRestrictError extends Error {
    constructor(relationName: string);
  }
  class RelationInvalidOnDeleteError extends Error {
    constructor(sheetName: string, relationName: string, value: string);
  }
  class RelationOnUpdateRestrictError extends Error {
    constructor(relationName: string);
  }
  class RelationInvalidOnUpdateError extends Error {
    constructor(sheetName: string, relationName: string, value: string);
  }
  class NestedWriteConnectNotFoundError extends Error {
    constructor(sheetName: string);
  }
  class NestedWriteRelationNotFoundError extends Error {
    constructor(fieldName: string);
  }
  class NestedWriteInvalidOperationError extends Error {
    constructor(relationName: string, operation: string, relationType: string);
  }
  class NestedWriteWithoutRelationsError extends Error {
    constructor();
  }
  class RelationOrderByUnsupportedTypeError extends Error {
    constructor(relationName: string, relationType: string);
  }
  class RelationOrderByCountUnsupportedTypeError extends Error {
    constructor(relationName: string, relationType: string);
  }
  class GassmaRelationNotFoundError extends Error {
    constructor(relationName: string, sheetName: string);
  }
  class GassmaTargetSheetNotFoundError extends Error {
    constructor(targetSheetName: string);
  }
  class GassmaThroughRequiredError extends Error {
    constructor(relationName: string);
  }
  class GassmaIncludeSelectConflictError extends Error {
    constructor();
  }
  class GassmaRelationDuplicateError extends Error {
    constructor(sheetName: string, field: string, value: unknown);
  }
}

export namespace Gassma {
  interface GassmaClientMap {
    "Schema": {
      options: GassmaSchemaClientOptions;
      globalOmitConfig: GassmaSchemaGlobalOmitConfig;
    };
  }
}

export type GassmaSchemaGlobalOmitConfig = {
  "Schedule"?: GassmaSchemaScheduleOmit;
  "Participant"?: GassmaSchemaParticipantOmit;
};

export type GassmaSchemaDefaultsConfig = {};

export type GassmaSchemaUpdatedAtConfig = {};

export type GassmaSchemaIgnoreConfig = {
  "Schedule"?: "eventName" | "eventDate" | "remarks" | ("eventName" | "eventDate" | "remarks")[];
  "Participant"?: "eventName" | "name" | ("eventName" | "name")[];
};

export type GassmaSchemaIgnoreSheetsConfig = "Schedule" | "Participant" | ("Schedule" | "Participant")[];

export type GassmaSchemaMapConfig = {
  "Schedule"?: {
      "eventName"?: string;
      "eventDate"?: string;
      "remarks"?: string;
  };
  "Participant"?: {
      "eventName"?: string;
      "name"?: string;
  };
};

export type GassmaSchemaMapSheetsConfig = {
  "Schedule"?: string;
  "Participant"?: string;
};

export type GassmaSchemaAutoincrementConfig = {};

export type GassmaSchemaClientOptions<O extends GassmaSchemaGlobalOmitConfig = {}> = {
  id?: string;
  relations?: Gassma.RelationsConfig;
  omit?: O;
  defaults?: GassmaSchemaDefaultsConfig;
  updatedAt?: GassmaSchemaUpdatedAtConfig;
  autoincrement?: GassmaSchemaAutoincrementConfig;
  ignore?: GassmaSchemaIgnoreConfig;
  ignoreSheets?: GassmaSchemaIgnoreSheetsConfig;
  map?: GassmaSchemaMapConfig;
  mapSheets?: GassmaSchemaMapSheetsConfig;
};

export type GassmaSchemaSheet<O extends GassmaSchemaGlobalOmitConfig = {}> = {
  "Schedule": GassmaSchemaScheduleController<O extends { "Schedule": infer UO } ? UO extends GassmaSchemaScheduleOmit ? UO : {} : {}>;
  "Participant": GassmaSchemaParticipantController<O extends { "Participant": infer UO } ? UO extends GassmaSchemaParticipantOmit ? UO : {} : {}>;
};

export declare class GassmaSchemaScheduleController<GO extends GassmaSchemaScheduleOmit = {}> {
  constructor(sheetName: string, id?: string);

  readonly fields: Record<string, Gassma.FieldRef>;
  changeSettings(
    startRowNumber: number,
    startColumnNumber: number,
    endColumnNumber: number
  ): void;
  createMany(createdData: GassmaSchemaScheduleCreateManyData): CreateManyReturn;
  createManyAndReturn<T extends GassmaSchemaScheduleCreateManyAndReturnData>(createdData: T): GassmaSchemaScheduleFindResult<T["select"], T["omit"], GO>[];
  create<T extends GassmaSchemaScheduleCreateData>(createdData: T): GassmaSchemaScheduleFindResult<T["select"], T["omit"], GO>;
  findFirst<T extends GassmaSchemaScheduleFindFirstData>(findData: T): GassmaSchemaScheduleFindResult<T["select"], T["omit"], GO> | null;
  findFirstOrThrow<T extends GassmaSchemaScheduleFindFirstData>(findData: T): GassmaSchemaScheduleFindResult<T["select"], T["omit"], GO>;
  findMany<T extends GassmaSchemaScheduleFindManyData>(findData: T): GassmaSchemaScheduleFindResult<T["select"], T["omit"], GO>[];
  update<T extends GassmaSchemaScheduleUpdateSingleData>(updateData: T): GassmaSchemaScheduleFindResult<T["select"], T["omit"], GO> | null;
  updateMany(updateData: GassmaSchemaScheduleUpdateData): UpdateManyReturn;
  updateManyAndReturn(updateData: GassmaSchemaScheduleUpdateData): GassmaSchemaScheduleDefaultFindResult[];
  upsert<T extends GassmaSchemaScheduleUpsertSingleData>(upsertData: T): GassmaSchemaScheduleFindResult<T["select"], T["omit"], GO>;
  delete<T extends GassmaSchemaScheduleDeleteSingleData>(deleteData: T): GassmaSchemaScheduleFindResult<T["select"], T["omit"], GO> | null;
  deleteMany(deleteData: GassmaSchemaScheduleDeleteData): DeleteManyReturn;
  aggregate<T extends GassmaSchemaScheduleAggregateData>(aggregateData: T): GassmaSchemaScheduleAggregateResult<T>;
  count(coutData: GassmaSchemaScheduleCountData): number;
  groupBy<T extends GassmaSchemaScheduleGroupByData>(groupByData: T): GassmaSchemaScheduleGroupByResult<T>[];
}

export declare class GassmaSchemaParticipantController<GO extends GassmaSchemaParticipantOmit = {}> {
  constructor(sheetName: string, id?: string);

  readonly fields: Record<string, Gassma.FieldRef>;
  changeSettings(
    startRowNumber: number,
    startColumnNumber: number,
    endColumnNumber: number
  ): void;
  createMany(createdData: GassmaSchemaParticipantCreateManyData): CreateManyReturn;
  createManyAndReturn<T extends GassmaSchemaParticipantCreateManyAndReturnData>(createdData: T): GassmaSchemaParticipantFindResult<T["select"], T["omit"], GO>[];
  create<T extends GassmaSchemaParticipantCreateData>(createdData: T): GassmaSchemaParticipantFindResult<T["select"], T["omit"], GO>;
  findFirst<T extends GassmaSchemaParticipantFindFirstData>(findData: T): GassmaSchemaParticipantFindResult<T["select"], T["omit"], GO> | null;
  findFirstOrThrow<T extends GassmaSchemaParticipantFindFirstData>(findData: T): GassmaSchemaParticipantFindResult<T["select"], T["omit"], GO>;
  findMany<T extends GassmaSchemaParticipantFindManyData>(findData: T): GassmaSchemaParticipantFindResult<T["select"], T["omit"], GO>[];
  update<T extends GassmaSchemaParticipantUpdateSingleData>(updateData: T): GassmaSchemaParticipantFindResult<T["select"], T["omit"], GO> | null;
  updateMany(updateData: GassmaSchemaParticipantUpdateData): UpdateManyReturn;
  updateManyAndReturn(updateData: GassmaSchemaParticipantUpdateData): GassmaSchemaParticipantDefaultFindResult[];
  upsert<T extends GassmaSchemaParticipantUpsertSingleData>(upsertData: T): GassmaSchemaParticipantFindResult<T["select"], T["omit"], GO>;
  delete<T extends GassmaSchemaParticipantDeleteSingleData>(deleteData: T): GassmaSchemaParticipantFindResult<T["select"], T["omit"], GO> | null;
  deleteMany(deleteData: GassmaSchemaParticipantDeleteData): DeleteManyReturn;
  aggregate<T extends GassmaSchemaParticipantAggregateData>(aggregateData: T): GassmaSchemaParticipantAggregateResult<T>;
  count(coutData: GassmaSchemaParticipantCountData): number;
  groupBy<T extends GassmaSchemaParticipantGroupByData>(groupByData: T): GassmaSchemaParticipantGroupByResult<T>[];
}

export type ManyReturn = {
  count: number;
};

export type CreateManyReturn = ManyReturn;
export type UpdateManyReturn = ManyReturn;
export type DeleteManyReturn = ManyReturn;

export type GassmaSchemaScheduleUse = {
  "eventName": string;
  "eventDate"?: Date;
  "remarks"?: string;
};

export type GassmaSchemaParticipantUse = {
  "eventName": string;
  "name": string;
};

export type GassmaSchemaScheduleCreateData = {
  data: GassmaSchemaScheduleUse & {
    "participants"?: { create?: GassmaSchemaParticipantUse | GassmaSchemaParticipantUse[]; connect?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; connectOrCreate?: { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse } | { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse }[]; update?: { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> } | { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> }[]; delete?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; deleteMany?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; disconnect?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; set?: GassmaSchemaParticipantWhereUse[] };
  };
  include?: GassmaSchemaScheduleInclude;
} & ({ select?: GassmaSchemaScheduleSelect; omit?: never } | { select?: never; omit?: GassmaSchemaScheduleOmit });

export type GassmaSchemaParticipantCreateData = {
  data: GassmaSchemaParticipantUse & {
    "schedule"?: { create?: GassmaSchemaScheduleUse; connect?: GassmaSchemaScheduleWhereUse; connectOrCreate?: { where: GassmaSchemaScheduleWhereUse; create: GassmaSchemaScheduleUse } };
  };
  include?: GassmaSchemaParticipantInclude;
} & ({ select?: GassmaSchemaParticipantSelect; omit?: never } | { select?: never; omit?: GassmaSchemaParticipantOmit });

export type GassmaSchemaScheduleCreateManyData = {
  data: GassmaSchemaScheduleUse[];
};

export type GassmaSchemaParticipantCreateManyData = {
  data: GassmaSchemaParticipantUse[];
};

export type GassmaSchemaScheduleCreateManyAndReturnData = {
  data: GassmaSchemaScheduleUse[];
  include?: GassmaSchemaScheduleInclude;
} & ({ select?: GassmaSchemaScheduleSelect; omit?: never } | { select?: never; omit?: GassmaSchemaScheduleOmit });

export type GassmaSchemaParticipantCreateManyAndReturnData = {
  data: GassmaSchemaParticipantUse[];
  include?: GassmaSchemaParticipantInclude;
} & ({ select?: GassmaSchemaParticipantSelect; omit?: never } | { select?: never; omit?: GassmaSchemaParticipantOmit });

export type GassmaSchemaScheduleeventNameFilterConditions = {
  equals?: string | Gassma.FieldRef;
  not?: string;
  in?: string[];
  notIn?: string[];
  lt?: string | Gassma.FieldRef;
  lte?: string | Gassma.FieldRef;
  gt?: string | Gassma.FieldRef;
  gte?: string | Gassma.FieldRef;
  contains?: string | Gassma.FieldRef;
  startsWith?: string | Gassma.FieldRef;
  endsWith?: string | Gassma.FieldRef;
  mode?: "default" | "insensitive";
};

export type GassmaSchemaScheduleeventDateFilterConditions = {
  equals?: Date | null | Gassma.FieldRef;
  not?: Date | null;
  in?: Date[];
  notIn?: Date[];
  lt?: Date | Gassma.FieldRef;
  lte?: Date | Gassma.FieldRef;
  gt?: Date | Gassma.FieldRef;
  gte?: Date | Gassma.FieldRef;
  contains?: string | Gassma.FieldRef;
  startsWith?: string | Gassma.FieldRef;
  endsWith?: string | Gassma.FieldRef;
  mode?: "default" | "insensitive";
};

export type GassmaSchemaScheduleremarksFilterConditions = {
  equals?: string | null | Gassma.FieldRef;
  not?: string | null;
  in?: string[];
  notIn?: string[];
  lt?: string | Gassma.FieldRef;
  lte?: string | Gassma.FieldRef;
  gt?: string | Gassma.FieldRef;
  gte?: string | Gassma.FieldRef;
  contains?: string | Gassma.FieldRef;
  startsWith?: string | Gassma.FieldRef;
  endsWith?: string | Gassma.FieldRef;
  mode?: "default" | "insensitive";
};

export type GassmaSchemaParticipanteventNameFilterConditions = {
  equals?: string | Gassma.FieldRef;
  not?: string;
  in?: string[];
  notIn?: string[];
  lt?: string | Gassma.FieldRef;
  lte?: string | Gassma.FieldRef;
  gt?: string | Gassma.FieldRef;
  gte?: string | Gassma.FieldRef;
  contains?: string | Gassma.FieldRef;
  startsWith?: string | Gassma.FieldRef;
  endsWith?: string | Gassma.FieldRef;
  mode?: "default" | "insensitive";
};

export type GassmaSchemaParticipantnameFilterConditions = {
  equals?: string | Gassma.FieldRef;
  not?: string;
  in?: string[];
  notIn?: string[];
  lt?: string | Gassma.FieldRef;
  lte?: string | Gassma.FieldRef;
  gt?: string | Gassma.FieldRef;
  gte?: string | Gassma.FieldRef;
  contains?: string | Gassma.FieldRef;
  startsWith?: string | Gassma.FieldRef;
  endsWith?: string | Gassma.FieldRef;
  mode?: "default" | "insensitive";
};

export type GassmaSchemaScheduleWhereUse = {
  "eventName"?: string | GassmaSchemaScheduleeventNameFilterConditions;
  "eventDate"?: Date | null | GassmaSchemaScheduleeventDateFilterConditions;
  "remarks"?: string | null | GassmaSchemaScheduleremarksFilterConditions;
  "participants"?: { some?: GassmaSchemaParticipantWhereUse; every?: GassmaSchemaParticipantWhereUse; none?: GassmaSchemaParticipantWhereUse };

  AND?: GassmaSchemaScheduleWhereUse[] | GassmaSchemaScheduleWhereUse;
  OR?: GassmaSchemaScheduleWhereUse[];
  NOT?: GassmaSchemaScheduleWhereUse[] | GassmaSchemaScheduleWhereUse;
};

export type GassmaSchemaParticipantWhereUse = {
  "eventName"?: string | GassmaSchemaParticipanteventNameFilterConditions;
  "name"?: string | GassmaSchemaParticipantnameFilterConditions;
  "schedule"?: { is?: GassmaSchemaScheduleWhereUse; isNot?: GassmaSchemaScheduleWhereUse };

  AND?: GassmaSchemaParticipantWhereUse[] | GassmaSchemaParticipantWhereUse;
  OR?: GassmaSchemaParticipantWhereUse[];
  NOT?: GassmaSchemaParticipantWhereUse[] | GassmaSchemaParticipantWhereUse;
};

export type GassmaSchemaScheduleeventNameHavingCore = {
  _avg?: GassmaSchemaScheduleeventNameFilterConditions;
  _count?: GassmaSchemaScheduleeventNameFilterConditions;
  _max?: GassmaSchemaScheduleeventNameFilterConditions;
  _min?: GassmaSchemaScheduleeventNameFilterConditions;
  _sum?: GassmaSchemaScheduleeventNameFilterConditions;
} & GassmaSchemaScheduleeventNameFilterConditions;

export type GassmaSchemaScheduleeventDateHavingCore = {
  _avg?: GassmaSchemaScheduleeventDateFilterConditions;
  _count?: GassmaSchemaScheduleeventDateFilterConditions;
  _max?: GassmaSchemaScheduleeventDateFilterConditions;
  _min?: GassmaSchemaScheduleeventDateFilterConditions;
  _sum?: GassmaSchemaScheduleeventDateFilterConditions;
} & GassmaSchemaScheduleeventDateFilterConditions;

export type GassmaSchemaScheduleremarksHavingCore = {
  _avg?: GassmaSchemaScheduleremarksFilterConditions;
  _count?: GassmaSchemaScheduleremarksFilterConditions;
  _max?: GassmaSchemaScheduleremarksFilterConditions;
  _min?: GassmaSchemaScheduleremarksFilterConditions;
  _sum?: GassmaSchemaScheduleremarksFilterConditions;
} & GassmaSchemaScheduleremarksFilterConditions;

export type GassmaSchemaParticipanteventNameHavingCore = {
  _avg?: GassmaSchemaParticipanteventNameFilterConditions;
  _count?: GassmaSchemaParticipanteventNameFilterConditions;
  _max?: GassmaSchemaParticipanteventNameFilterConditions;
  _min?: GassmaSchemaParticipanteventNameFilterConditions;
  _sum?: GassmaSchemaParticipanteventNameFilterConditions;
} & GassmaSchemaParticipanteventNameFilterConditions;

export type GassmaSchemaParticipantnameHavingCore = {
  _avg?: GassmaSchemaParticipantnameFilterConditions;
  _count?: GassmaSchemaParticipantnameFilterConditions;
  _max?: GassmaSchemaParticipantnameFilterConditions;
  _min?: GassmaSchemaParticipantnameFilterConditions;
  _sum?: GassmaSchemaParticipantnameFilterConditions;
} & GassmaSchemaParticipantnameFilterConditions;

export type GassmaSchemaScheduleHavingUse = {
  "eventName"?: string | GassmaSchemaScheduleeventNameHavingCore;
  "eventDate"?: Date | null | GassmaSchemaScheduleeventDateHavingCore;
  "remarks"?: string | null | GassmaSchemaScheduleremarksHavingCore;

  AND?: GassmaSchemaScheduleHavingUse[] | GassmaSchemaScheduleHavingUse;
  OR?: GassmaSchemaScheduleHavingUse[];
  NOT?: GassmaSchemaScheduleHavingUse[] | GassmaSchemaScheduleHavingUse;
};

export type GassmaSchemaParticipantHavingUse = {
  "eventName"?: string | GassmaSchemaParticipanteventNameHavingCore;
  "name"?: string | GassmaSchemaParticipantnameHavingCore;

  AND?: GassmaSchemaParticipantHavingUse[] | GassmaSchemaParticipantHavingUse;
  OR?: GassmaSchemaParticipantHavingUse[];
  NOT?: GassmaSchemaParticipantHavingUse[] | GassmaSchemaParticipantHavingUse;
};

export type GassmaSchemaScheduleFindData = {
  where?: GassmaSchemaScheduleWhereUse;
  orderBy?: GassmaSchemaScheduleOrderBy;
  take?: number;
  skip?: number;
  distinct?: "eventName" | "eventDate" | "remarks" | ("eventName" | "eventDate" | "remarks")[];
  include?: GassmaSchemaScheduleInclude;
  cursor?: Partial<GassmaSchemaScheduleUse>;
  _count?: GassmaSchemaScheduleCountValue;
} & ({ select?: GassmaSchemaScheduleFindSelect; omit?: never } | { select?: never; omit?: GassmaSchemaScheduleOmit });

export type GassmaSchemaParticipantFindData = {
  where?: GassmaSchemaParticipantWhereUse;
  orderBy?: GassmaSchemaParticipantOrderBy;
  take?: number;
  skip?: number;
  distinct?: "eventName" | "name" | ("eventName" | "name")[];
  include?: GassmaSchemaParticipantInclude;
  cursor?: Partial<GassmaSchemaParticipantUse>;
  _count?: GassmaSchemaParticipantCountValue;
} & ({ select?: GassmaSchemaParticipantFindSelect; omit?: never } | { select?: never; omit?: GassmaSchemaParticipantOmit });

export type GassmaSchemaScheduleFindFirstData = {
  where?: GassmaSchemaScheduleWhereUse;
  orderBy?: GassmaSchemaScheduleOrderBy;
  include?: GassmaSchemaScheduleInclude;
  cursor?: Partial<GassmaSchemaScheduleUse>;
  _count?: GassmaSchemaScheduleCountValue;
} & ({ select?: GassmaSchemaScheduleFindSelect; omit?: never } | { select?: never; omit?: GassmaSchemaScheduleOmit });

export type GassmaSchemaParticipantFindFirstData = {
  where?: GassmaSchemaParticipantWhereUse;
  orderBy?: GassmaSchemaParticipantOrderBy;
  include?: GassmaSchemaParticipantInclude;
  cursor?: Partial<GassmaSchemaParticipantUse>;
  _count?: GassmaSchemaParticipantCountValue;
} & ({ select?: GassmaSchemaParticipantFindSelect; omit?: never } | { select?: never; omit?: GassmaSchemaParticipantOmit });

export type GassmaSchemaScheduleFindManyData = GassmaSchemaScheduleFindData;

export type GassmaSchemaParticipantFindManyData = GassmaSchemaParticipantFindData;

export type GassmaSchemaScheduleUpdateData = {
  where?: GassmaSchemaScheduleWhereUse;
  data: Partial<{ [K in keyof GassmaSchemaScheduleUse]: GassmaSchemaScheduleUse[K] | Gassma.NumberOperation }> & {
    "participants"?: { create?: GassmaSchemaParticipantUse | GassmaSchemaParticipantUse[]; connect?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; connectOrCreate?: { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse } | { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse }[]; update?: { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> } | { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> }[]; delete?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; deleteMany?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; disconnect?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; set?: GassmaSchemaParticipantWhereUse[] };
  };
  limit?: number;
};

export type GassmaSchemaParticipantUpdateData = {
  where?: GassmaSchemaParticipantWhereUse;
  data: Partial<{ [K in keyof GassmaSchemaParticipantUse]: GassmaSchemaParticipantUse[K] | Gassma.NumberOperation }> & {
    "schedule"?: { create?: GassmaSchemaScheduleUse; connect?: GassmaSchemaScheduleWhereUse; connectOrCreate?: { where: GassmaSchemaScheduleWhereUse; create: GassmaSchemaScheduleUse } };
  };
  limit?: number;
};

export type GassmaSchemaScheduleUpdateSingleData = {
  where: GassmaSchemaScheduleWhereUse;
  data: Partial<{ [K in keyof GassmaSchemaScheduleUse]: GassmaSchemaScheduleUse[K] | Gassma.NumberOperation }> & {
    "participants"?: { create?: GassmaSchemaParticipantUse | GassmaSchemaParticipantUse[]; connect?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; connectOrCreate?: { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse } | { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse }[]; update?: { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> } | { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> }[]; delete?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; deleteMany?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; disconnect?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; set?: GassmaSchemaParticipantWhereUse[] };
  };
  include?: GassmaSchemaScheduleInclude;
} & ({ select?: GassmaSchemaScheduleSelect; omit?: never } | { select?: never; omit?: GassmaSchemaScheduleOmit });

export type GassmaSchemaParticipantUpdateSingleData = {
  where: GassmaSchemaParticipantWhereUse;
  data: Partial<{ [K in keyof GassmaSchemaParticipantUse]: GassmaSchemaParticipantUse[K] | Gassma.NumberOperation }> & {
    "schedule"?: { create?: GassmaSchemaScheduleUse; connect?: GassmaSchemaScheduleWhereUse; connectOrCreate?: { where: GassmaSchemaScheduleWhereUse; create: GassmaSchemaScheduleUse } };
  };
  include?: GassmaSchemaParticipantInclude;
} & ({ select?: GassmaSchemaParticipantSelect; omit?: never } | { select?: never; omit?: GassmaSchemaParticipantOmit });

export type GassmaSchemaScheduleUpsertSingleData = {
  where: GassmaSchemaScheduleWhereUse;
  create: GassmaSchemaScheduleUse & {
    "participants"?: { create?: GassmaSchemaParticipantUse | GassmaSchemaParticipantUse[]; connect?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; connectOrCreate?: { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse } | { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse }[]; update?: { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> } | { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> }[]; delete?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; deleteMany?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; disconnect?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; set?: GassmaSchemaParticipantWhereUse[] };
  };
  update: Partial<{ [K in keyof GassmaSchemaScheduleUse]: GassmaSchemaScheduleUse[K] | Gassma.NumberOperation }> & {
    "participants"?: { create?: GassmaSchemaParticipantUse | GassmaSchemaParticipantUse[]; connect?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; connectOrCreate?: { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse } | { where: GassmaSchemaParticipantWhereUse; create: GassmaSchemaParticipantUse }[]; update?: { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> } | { where: GassmaSchemaParticipantWhereUse; data: Partial<GassmaSchemaParticipantUse> }[]; delete?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; deleteMany?: GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; disconnect?: boolean | GassmaSchemaParticipantWhereUse | GassmaSchemaParticipantWhereUse[]; set?: GassmaSchemaParticipantWhereUse[] };
  };
  include?: GassmaSchemaScheduleInclude;
} & ({ select?: GassmaSchemaScheduleSelect; omit?: never } | { select?: never; omit?: GassmaSchemaScheduleOmit });

export type GassmaSchemaParticipantUpsertSingleData = {
  where: GassmaSchemaParticipantWhereUse;
  create: GassmaSchemaParticipantUse & {
    "schedule"?: { create?: GassmaSchemaScheduleUse; connect?: GassmaSchemaScheduleWhereUse; connectOrCreate?: { where: GassmaSchemaScheduleWhereUse; create: GassmaSchemaScheduleUse } };
  };
  update: Partial<{ [K in keyof GassmaSchemaParticipantUse]: GassmaSchemaParticipantUse[K] | Gassma.NumberOperation }> & {
    "schedule"?: { create?: GassmaSchemaScheduleUse; connect?: GassmaSchemaScheduleWhereUse; connectOrCreate?: { where: GassmaSchemaScheduleWhereUse; create: GassmaSchemaScheduleUse } };
  };
  include?: GassmaSchemaParticipantInclude;
} & ({ select?: GassmaSchemaParticipantSelect; omit?: never } | { select?: never; omit?: GassmaSchemaParticipantOmit });

export type GassmaSchemaScheduleDeleteData = {
  where: GassmaSchemaScheduleWhereUse;
  limit?: number;
};

export type GassmaSchemaParticipantDeleteData = {
  where: GassmaSchemaParticipantWhereUse;
  limit?: number;
};

export type GassmaSchemaScheduleDeleteSingleData = {
  where: GassmaSchemaScheduleWhereUse;
  include?: GassmaSchemaScheduleInclude;
} & ({ select?: GassmaSchemaScheduleSelect; omit?: never } | { select?: never; omit?: GassmaSchemaScheduleOmit });

export type GassmaSchemaParticipantDeleteSingleData = {
  where: GassmaSchemaParticipantWhereUse;
  include?: GassmaSchemaParticipantInclude;
} & ({ select?: GassmaSchemaParticipantSelect; omit?: never } | { select?: never; omit?: GassmaSchemaParticipantOmit });

export type GassmaSchemaScheduleAggregateData = {
  where?: GassmaSchemaScheduleWhereUse;
  orderBy?: GassmaSchemaScheduleOrderBy;
  take?: number;
  skip?: number;
  cursor?: Partial<GassmaSchemaScheduleUse>;
  _avg?: GassmaSchemaScheduleSelect;
  _count?: GassmaSchemaScheduleSelect;
  _max?: GassmaSchemaScheduleSelect;
  _min?: GassmaSchemaScheduleSelect;
  _sum?: GassmaSchemaScheduleSelect;
};

export type GassmaSchemaParticipantAggregateData = {
  where?: GassmaSchemaParticipantWhereUse;
  orderBy?: GassmaSchemaParticipantOrderBy;
  take?: number;
  skip?: number;
  cursor?: Partial<GassmaSchemaParticipantUse>;
  _avg?: GassmaSchemaParticipantSelect;
  _count?: GassmaSchemaParticipantSelect;
  _max?: GassmaSchemaParticipantSelect;
  _min?: GassmaSchemaParticipantSelect;
  _sum?: GassmaSchemaParticipantSelect;
};

export type GassmaSchemaScheduleGroupByData = GassmaSchemaScheduleAggregateData & {
  by: "eventName" | "eventDate" | "remarks" | ("eventName" | "eventDate" | "remarks")[];
  having?: GassmaSchemaScheduleHavingUse;
};

export type GassmaSchemaParticipantGroupByData = GassmaSchemaParticipantAggregateData & {
  by: "eventName" | "name" | ("eventName" | "name")[];
  having?: GassmaSchemaParticipantHavingUse;
};

export type GassmaSchemaScheduleInclude = {
  "participants"?: true | { select?: GassmaSchemaParticipantSelect; omit?: GassmaSchemaParticipantOmit; where?: GassmaSchemaParticipantWhereUse; orderBy?: GassmaSchemaParticipantOrderBy; take?: number; skip?: number; include?: GassmaSchemaParticipantInclude; _count?: GassmaSchemaParticipantCountValue };
  "_count"?: GassmaSchemaScheduleCountValue;
};

export type GassmaSchemaParticipantInclude = {
  "schedule"?: true | { select?: GassmaSchemaScheduleSelect; omit?: GassmaSchemaScheduleOmit; where?: GassmaSchemaScheduleWhereUse; orderBy?: GassmaSchemaScheduleOrderBy; take?: number; skip?: number; include?: GassmaSchemaScheduleInclude; _count?: GassmaSchemaScheduleCountValue };
  "_count"?: GassmaSchemaParticipantCountValue;
};

export type GassmaSchemaScheduleCountValue = true | { select: {
    "participants"?: true | { where?: GassmaSchemaParticipantWhereUse };
  } };

export type GassmaSchemaParticipantCountValue = true | { select: {
    "schedule"?: true | { where?: GassmaSchemaScheduleWhereUse };
  } };

export type GassmaSchemaScheduleOrderBy = {
  "eventName"?: "asc" | "desc" | Gassma.SortOrderInput;
  "eventDate"?: "asc" | "desc" | Gassma.SortOrderInput;
  "remarks"?: "asc" | "desc" | Gassma.SortOrderInput;
  "participants"?: GassmaSchemaParticipantOrderBy | { _count: "asc" | "desc" };
  "_count"?: { "participants"?: "asc" | "desc" };
};

export type GassmaSchemaParticipantOrderBy = {
  "eventName"?: "asc" | "desc" | Gassma.SortOrderInput;
  "name"?: "asc" | "desc" | Gassma.SortOrderInput;
  "schedule"?: GassmaSchemaScheduleOrderBy | { _count: "asc" | "desc" };
  "_count"?: { "schedule"?: "asc" | "desc" };
};

export type GassmaSchemaScheduleSelect = {
  "eventName"?: true;
  "eventDate"?: true;
  "remarks"?: true;
};

export type GassmaSchemaScheduleFindSelect = {
  "eventName"?: true;
  "eventDate"?: true;
  "remarks"?: true;
  "participants"?: true | { select?: GassmaSchemaParticipantSelect; omit?: GassmaSchemaParticipantOmit; where?: GassmaSchemaParticipantWhereUse; orderBy?: GassmaSchemaParticipantOrderBy; take?: number; skip?: number; include?: GassmaSchemaParticipantInclude; _count?: GassmaSchemaParticipantCountValue };
  "_count"?: GassmaSchemaScheduleCountValue;
};

export type GassmaSchemaParticipantSelect = {
  "eventName"?: true;
  "name"?: true;
};

export type GassmaSchemaParticipantFindSelect = {
  "eventName"?: true;
  "name"?: true;
  "schedule"?: true | { select?: GassmaSchemaScheduleSelect; omit?: GassmaSchemaScheduleOmit; where?: GassmaSchemaScheduleWhereUse; orderBy?: GassmaSchemaScheduleOrderBy; take?: number; skip?: number; include?: GassmaSchemaScheduleInclude; _count?: GassmaSchemaScheduleCountValue };
  "_count"?: GassmaSchemaParticipantCountValue;
};

export type GassmaSchemaScheduleOmit = {
  "eventName"?: true | false;
  "eventDate"?: true | false;
  "remarks"?: true | false;
};

export type GassmaSchemaParticipantOmit = {
  "eventName"?: true | false;
  "name"?: true | false;
};

export type GassmaSchemaScheduleCountData = {
  where?: GassmaSchemaScheduleWhereUse;
  orderBy?: GassmaSchemaScheduleOrderBy;
  take?: number;
  skip?: number;
  cursor?: Partial<GassmaSchemaScheduleUse>;
};

export type GassmaSchemaParticipantCountData = {
  where?: GassmaSchemaParticipantWhereUse;
  orderBy?: GassmaSchemaParticipantOrderBy;
  take?: number;
  skip?: number;
  cursor?: Partial<GassmaSchemaParticipantUse>;
};

export type GassmaSchemaScheduleCreateReturn = {
 "eventName": string;
 "eventDate": Date | null;
 "remarks": string | null;
};

export type GassmaSchemaParticipantCreateReturn = {
 "eventName": string;
 "name": string;
};

export type GassmaSchemaScheduleDefaultFindResult = GassmaSchemaScheduleCreateReturn;

export type GassmaSchemaParticipantDefaultFindResult = GassmaSchemaParticipantCreateReturn;

export type GassmaSchemaScheduleFindResult<S, QO = undefined, GO = {}> = S extends GassmaSchemaScheduleSelect
  ? {
      [K in keyof S as S[K] extends true
        ? K & keyof GassmaSchemaScheduleDefaultFindResult
        : never]: GassmaSchemaScheduleDefaultFindResult[K & keyof GassmaSchemaScheduleDefaultFindResult];
    }
  : {
      [K in keyof GassmaSchemaScheduleDefaultFindResult as
        K extends Gassma.ResolveOmitKeys<GO, QO> ? never : K
      ]: GassmaSchemaScheduleDefaultFindResult[K];
    };

export type GassmaSchemaParticipantFindResult<S, QO = undefined, GO = {}> = S extends GassmaSchemaParticipantSelect
  ? {
      [K in keyof S as S[K] extends true
        ? K & keyof GassmaSchemaParticipantDefaultFindResult
        : never]: GassmaSchemaParticipantDefaultFindResult[K & keyof GassmaSchemaParticipantDefaultFindResult];
    }
  : {
      [K in keyof GassmaSchemaParticipantDefaultFindResult as
        K extends Gassma.ResolveOmitKeys<GO, QO> ? never : K
      ]: GassmaSchemaParticipantDefaultFindResult[K];
    };

export type GassmaSchemaScheduleAggregateBaseReturn = {
  "eventName": string
  "eventDate": Date
  "remarks": string
};

export type GassmaSchemaParticipantAggregateBaseReturn = {
  "eventName": string
  "name": string
};

export type GassmaSchemaScheduleAggregateField<T, K extends string> = T extends undefined
  ? never
  : K extends "_count"
    ? { [P in keyof T as T[P] extends true ? P : never]: number }
    : {
        [P in keyof T as T[P] extends true
          ? P & keyof GassmaSchemaScheduleAggregateBaseReturn
          : never]: GassmaSchemaScheduleAggregateBaseReturn[P & keyof GassmaSchemaScheduleAggregateBaseReturn];
      };

export type GassmaSchemaParticipantAggregateField<T, K extends string> = T extends undefined
  ? never
  : K extends "_count"
    ? { [P in keyof T as T[P] extends true ? P : never]: number }
    : {
        [P in keyof T as T[P] extends true
          ? P & keyof GassmaSchemaParticipantAggregateBaseReturn
          : never]: GassmaSchemaParticipantAggregateBaseReturn[P & keyof GassmaSchemaParticipantAggregateBaseReturn];
      };

export type GassmaSchemaScheduleAggregateResult<T extends GassmaSchemaScheduleAggregateData> = {
  [K in keyof T as K extends "_avg" | "_count" | "_max" | "_min" | "_sum"
    ? T[K] extends undefined
      ? never
      : K
    : never]: K extends string ? GassmaSchemaScheduleAggregateField<T[K], K> : never;
};

export type GassmaSchemaParticipantAggregateResult<T extends GassmaSchemaParticipantAggregateData> = {
  [K in keyof T as K extends "_avg" | "_count" | "_max" | "_min" | "_sum"
    ? T[K] extends undefined
      ? never
      : K
    : never]: K extends string ? GassmaSchemaParticipantAggregateField<T[K], K> : never;
};

export type GassmaSchemaScheduleGroupByBaseReturn = GassmaSchemaScheduleCreateReturn;

export type GassmaSchemaParticipantGroupByBaseReturn = GassmaSchemaParticipantCreateReturn;

export type GassmaSchemaScheduleGroupByKeyOfBaseReturn = keyof GassmaSchemaScheduleGroupByBaseReturn;

export type GassmaSchemaParticipantGroupByKeyOfBaseReturn = keyof GassmaSchemaParticipantGroupByBaseReturn;

export type GassmaSchemaScheduleByField<T extends GassmaSchemaScheduleGroupByKeyOfBaseReturn | GassmaSchemaScheduleGroupByKeyOfBaseReturn[]> =
  T extends GassmaSchemaScheduleGroupByKeyOfBaseReturn[]
    ? {
        [K in T[number]]: GassmaSchemaScheduleGroupByBaseReturn[K & keyof GassmaSchemaScheduleGroupByBaseReturn];
      }
    : T extends keyof GassmaSchemaScheduleGroupByBaseReturn
      ? { [K in T]: GassmaSchemaScheduleGroupByBaseReturn[K] }
      : never;

export type GassmaSchemaParticipantByField<T extends GassmaSchemaParticipantGroupByKeyOfBaseReturn | GassmaSchemaParticipantGroupByKeyOfBaseReturn[]> =
  T extends GassmaSchemaParticipantGroupByKeyOfBaseReturn[]
    ? {
        [K in T[number]]: GassmaSchemaParticipantGroupByBaseReturn[K & keyof GassmaSchemaParticipantGroupByBaseReturn];
      }
    : T extends keyof GassmaSchemaParticipantGroupByBaseReturn
      ? { [K in T]: GassmaSchemaParticipantGroupByBaseReturn[K] }
      : never;

export type GassmaSchemaScheduleGroupByResult<T extends GassmaSchemaScheduleGroupByData> = GassmaSchemaScheduleByField<T["by"]> & {
  [K in keyof T as K extends "_avg" | "_count" | "_max" | "_min" | "_sum"
    ? T[K] extends undefined
      ? never
      : K
    : never]: K extends string ? GassmaSchemaScheduleAggregateField<T[K], K> : never;
};

export type GassmaSchemaParticipantGroupByResult<T extends GassmaSchemaParticipantGroupByData> = GassmaSchemaParticipantByField<T["by"]> & {
  [K in keyof T as K extends "_avg" | "_count" | "_max" | "_min" | "_sum"
    ? T[K] extends undefined
      ? never
      : K
    : never]: K extends string ? GassmaSchemaParticipantAggregateField<T[K], K> : never;
};

export interface GassmaClient<O extends GassmaSchemaGlobalOmitConfig = {}> extends GassmaSchemaSheet<O> {}
export declare class GassmaClient<O extends GassmaSchemaGlobalOmitConfig = {}> {
  constructor(options?: GassmaSchemaClientOptions<O>);
}
