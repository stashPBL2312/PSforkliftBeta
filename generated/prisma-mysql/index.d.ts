
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Forklift
 * 
 */
export type Forklift = $Result.DefaultSelection<Prisma.$ForkliftPayload>
/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model Record
 * 
 */
export type Record = $Result.DefaultSelection<Prisma.$RecordPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.forklift`: Exposes CRUD operations for the **Forklift** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Forklifts
    * const forklifts = await prisma.forklift.findMany()
    * ```
    */
  get forklift(): Prisma.ForkliftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.record`: Exposes CRUD operations for the **Record** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Records
    * const records = await prisma.record.findMany()
    * ```
    */
  get record(): Prisma.RecordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.0
   * Query Engine version: c0aafc03b8ef6cdced8654b9a817999e02457d6a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Forklift: 'Forklift',
    Item: 'Item',
    Job: 'Job',
    Record: 'Record'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "forklift" | "item" | "job" | "record"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Forklift: {
        payload: Prisma.$ForkliftPayload<ExtArgs>
        fields: Prisma.ForkliftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForkliftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForkliftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForkliftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForkliftPayload>
          }
          findFirst: {
            args: Prisma.ForkliftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForkliftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForkliftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForkliftPayload>
          }
          findMany: {
            args: Prisma.ForkliftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForkliftPayload>[]
          }
          create: {
            args: Prisma.ForkliftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForkliftPayload>
          }
          createMany: {
            args: Prisma.ForkliftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ForkliftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForkliftPayload>
          }
          update: {
            args: Prisma.ForkliftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForkliftPayload>
          }
          deleteMany: {
            args: Prisma.ForkliftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForkliftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ForkliftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForkliftPayload>
          }
          aggregate: {
            args: Prisma.ForkliftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForklift>
          }
          groupBy: {
            args: Prisma.ForkliftGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForkliftGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForkliftCountArgs<ExtArgs>
            result: $Utils.Optional<ForkliftCountAggregateOutputType> | number
          }
        }
      }
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      Record: {
        payload: Prisma.$RecordPayload<ExtArgs>
        fields: Prisma.RecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordPayload>
          }
          findFirst: {
            args: Prisma.RecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordPayload>
          }
          findMany: {
            args: Prisma.RecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordPayload>[]
          }
          create: {
            args: Prisma.RecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordPayload>
          }
          createMany: {
            args: Prisma.RecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordPayload>
          }
          update: {
            args: Prisma.RecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordPayload>
          }
          deleteMany: {
            args: Prisma.RecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordPayload>
          }
          aggregate: {
            args: Prisma.RecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecord>
          }
          groupBy: {
            args: Prisma.RecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecordCountArgs<ExtArgs>
            result: $Utils.Optional<RecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    forklift?: ForkliftOmit
    item?: ItemOmit
    job?: JobOmit
    record?: RecordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ForkliftCountOutputType
   */

  export type ForkliftCountOutputType = {
    jobs: number
    records: number
  }

  export type ForkliftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | ForkliftCountOutputTypeCountJobsArgs
    records?: boolean | ForkliftCountOutputTypeCountRecordsArgs
  }

  // Custom InputTypes
  /**
   * ForkliftCountOutputType without action
   */
  export type ForkliftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForkliftCountOutputType
     */
    select?: ForkliftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ForkliftCountOutputType without action
   */
  export type ForkliftCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * ForkliftCountOutputType without action
   */
  export type ForkliftCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    role: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    role: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    name: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    name?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    name?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    name?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    role: string
    name: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "role" | "name" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      role: string
      name: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly deleted_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Forklift
   */

  export type AggregateForklift = {
    _count: ForkliftCountAggregateOutputType | null
    _avg: ForkliftAvgAggregateOutputType | null
    _sum: ForkliftSumAggregateOutputType | null
    _min: ForkliftMinAggregateOutputType | null
    _max: ForkliftMaxAggregateOutputType | null
  }

  export type ForkliftAvgAggregateOutputType = {
    id: number | null
    tahun: number | null
  }

  export type ForkliftSumAggregateOutputType = {
    id: number | null
    tahun: number | null
  }

  export type ForkliftMinAggregateOutputType = {
    id: number | null
    brand: string | null
    type: string | null
    eq_no: string | null
    serial: string | null
    location: string | null
    powertrain: string | null
    owner: string | null
    tahun: number | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ForkliftMaxAggregateOutputType = {
    id: number | null
    brand: string | null
    type: string | null
    eq_no: string | null
    serial: string | null
    location: string | null
    powertrain: string | null
    owner: string | null
    tahun: number | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ForkliftCountAggregateOutputType = {
    id: number
    brand: number
    type: number
    eq_no: number
    serial: number
    location: number
    powertrain: number
    owner: number
    tahun: number
    status: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type ForkliftAvgAggregateInputType = {
    id?: true
    tahun?: true
  }

  export type ForkliftSumAggregateInputType = {
    id?: true
    tahun?: true
  }

  export type ForkliftMinAggregateInputType = {
    id?: true
    brand?: true
    type?: true
    eq_no?: true
    serial?: true
    location?: true
    powertrain?: true
    owner?: true
    tahun?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ForkliftMaxAggregateInputType = {
    id?: true
    brand?: true
    type?: true
    eq_no?: true
    serial?: true
    location?: true
    powertrain?: true
    owner?: true
    tahun?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ForkliftCountAggregateInputType = {
    id?: true
    brand?: true
    type?: true
    eq_no?: true
    serial?: true
    location?: true
    powertrain?: true
    owner?: true
    tahun?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type ForkliftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Forklift to aggregate.
     */
    where?: ForkliftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Forklifts to fetch.
     */
    orderBy?: ForkliftOrderByWithRelationInput | ForkliftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForkliftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Forklifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Forklifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Forklifts
    **/
    _count?: true | ForkliftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ForkliftAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ForkliftSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForkliftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForkliftMaxAggregateInputType
  }

  export type GetForkliftAggregateType<T extends ForkliftAggregateArgs> = {
        [P in keyof T & keyof AggregateForklift]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForklift[P]>
      : GetScalarType<T[P], AggregateForklift[P]>
  }




  export type ForkliftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForkliftWhereInput
    orderBy?: ForkliftOrderByWithAggregationInput | ForkliftOrderByWithAggregationInput[]
    by: ForkliftScalarFieldEnum[] | ForkliftScalarFieldEnum
    having?: ForkliftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForkliftCountAggregateInputType | true
    _avg?: ForkliftAvgAggregateInputType
    _sum?: ForkliftSumAggregateInputType
    _min?: ForkliftMinAggregateInputType
    _max?: ForkliftMaxAggregateInputType
  }

  export type ForkliftGroupByOutputType = {
    id: number
    brand: string | null
    type: string | null
    eq_no: string | null
    serial: string | null
    location: string | null
    powertrain: string | null
    owner: string | null
    tahun: number | null
    status: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: ForkliftCountAggregateOutputType | null
    _avg: ForkliftAvgAggregateOutputType | null
    _sum: ForkliftSumAggregateOutputType | null
    _min: ForkliftMinAggregateOutputType | null
    _max: ForkliftMaxAggregateOutputType | null
  }

  type GetForkliftGroupByPayload<T extends ForkliftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForkliftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForkliftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForkliftGroupByOutputType[P]>
            : GetScalarType<T[P], ForkliftGroupByOutputType[P]>
        }
      >
    >


  export type ForkliftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    type?: boolean
    eq_no?: boolean
    serial?: boolean
    location?: boolean
    powertrain?: boolean
    owner?: boolean
    tahun?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    jobs?: boolean | Forklift$jobsArgs<ExtArgs>
    records?: boolean | Forklift$recordsArgs<ExtArgs>
    _count?: boolean | ForkliftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forklift"]>



  export type ForkliftSelectScalar = {
    id?: boolean
    brand?: boolean
    type?: boolean
    eq_no?: boolean
    serial?: boolean
    location?: boolean
    powertrain?: boolean
    owner?: boolean
    tahun?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type ForkliftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "brand" | "type" | "eq_no" | "serial" | "location" | "powertrain" | "owner" | "tahun" | "status" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["forklift"]>
  export type ForkliftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | Forklift$jobsArgs<ExtArgs>
    records?: boolean | Forklift$recordsArgs<ExtArgs>
    _count?: boolean | ForkliftCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ForkliftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Forklift"
    objects: {
      jobs: Prisma.$JobPayload<ExtArgs>[]
      records: Prisma.$RecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      brand: string | null
      type: string | null
      eq_no: string | null
      serial: string | null
      location: string | null
      powertrain: string | null
      owner: string | null
      tahun: number | null
      status: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["forklift"]>
    composites: {}
  }

  type ForkliftGetPayload<S extends boolean | null | undefined | ForkliftDefaultArgs> = $Result.GetResult<Prisma.$ForkliftPayload, S>

  type ForkliftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForkliftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForkliftCountAggregateInputType | true
    }

  export interface ForkliftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Forklift'], meta: { name: 'Forklift' } }
    /**
     * Find zero or one Forklift that matches the filter.
     * @param {ForkliftFindUniqueArgs} args - Arguments to find a Forklift
     * @example
     * // Get one Forklift
     * const forklift = await prisma.forklift.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForkliftFindUniqueArgs>(args: SelectSubset<T, ForkliftFindUniqueArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Forklift that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForkliftFindUniqueOrThrowArgs} args - Arguments to find a Forklift
     * @example
     * // Get one Forklift
     * const forklift = await prisma.forklift.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForkliftFindUniqueOrThrowArgs>(args: SelectSubset<T, ForkliftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Forklift that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForkliftFindFirstArgs} args - Arguments to find a Forklift
     * @example
     * // Get one Forklift
     * const forklift = await prisma.forklift.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForkliftFindFirstArgs>(args?: SelectSubset<T, ForkliftFindFirstArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Forklift that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForkliftFindFirstOrThrowArgs} args - Arguments to find a Forklift
     * @example
     * // Get one Forklift
     * const forklift = await prisma.forklift.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForkliftFindFirstOrThrowArgs>(args?: SelectSubset<T, ForkliftFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Forklifts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForkliftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Forklifts
     * const forklifts = await prisma.forklift.findMany()
     * 
     * // Get first 10 Forklifts
     * const forklifts = await prisma.forklift.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const forkliftWithIdOnly = await prisma.forklift.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ForkliftFindManyArgs>(args?: SelectSubset<T, ForkliftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Forklift.
     * @param {ForkliftCreateArgs} args - Arguments to create a Forklift.
     * @example
     * // Create one Forklift
     * const Forklift = await prisma.forklift.create({
     *   data: {
     *     // ... data to create a Forklift
     *   }
     * })
     * 
     */
    create<T extends ForkliftCreateArgs>(args: SelectSubset<T, ForkliftCreateArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Forklifts.
     * @param {ForkliftCreateManyArgs} args - Arguments to create many Forklifts.
     * @example
     * // Create many Forklifts
     * const forklift = await prisma.forklift.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForkliftCreateManyArgs>(args?: SelectSubset<T, ForkliftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Forklift.
     * @param {ForkliftDeleteArgs} args - Arguments to delete one Forklift.
     * @example
     * // Delete one Forklift
     * const Forklift = await prisma.forklift.delete({
     *   where: {
     *     // ... filter to delete one Forklift
     *   }
     * })
     * 
     */
    delete<T extends ForkliftDeleteArgs>(args: SelectSubset<T, ForkliftDeleteArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Forklift.
     * @param {ForkliftUpdateArgs} args - Arguments to update one Forklift.
     * @example
     * // Update one Forklift
     * const forklift = await prisma.forklift.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForkliftUpdateArgs>(args: SelectSubset<T, ForkliftUpdateArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Forklifts.
     * @param {ForkliftDeleteManyArgs} args - Arguments to filter Forklifts to delete.
     * @example
     * // Delete a few Forklifts
     * const { count } = await prisma.forklift.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForkliftDeleteManyArgs>(args?: SelectSubset<T, ForkliftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Forklifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForkliftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Forklifts
     * const forklift = await prisma.forklift.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForkliftUpdateManyArgs>(args: SelectSubset<T, ForkliftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Forklift.
     * @param {ForkliftUpsertArgs} args - Arguments to update or create a Forklift.
     * @example
     * // Update or create a Forklift
     * const forklift = await prisma.forklift.upsert({
     *   create: {
     *     // ... data to create a Forklift
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Forklift we want to update
     *   }
     * })
     */
    upsert<T extends ForkliftUpsertArgs>(args: SelectSubset<T, ForkliftUpsertArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Forklifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForkliftCountArgs} args - Arguments to filter Forklifts to count.
     * @example
     * // Count the number of Forklifts
     * const count = await prisma.forklift.count({
     *   where: {
     *     // ... the filter for the Forklifts we want to count
     *   }
     * })
    **/
    count<T extends ForkliftCountArgs>(
      args?: Subset<T, ForkliftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForkliftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Forklift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForkliftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ForkliftAggregateArgs>(args: Subset<T, ForkliftAggregateArgs>): Prisma.PrismaPromise<GetForkliftAggregateType<T>>

    /**
     * Group by Forklift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForkliftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ForkliftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForkliftGroupByArgs['orderBy'] }
        : { orderBy?: ForkliftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ForkliftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForkliftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Forklift model
   */
  readonly fields: ForkliftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Forklift.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForkliftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobs<T extends Forklift$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Forklift$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    records<T extends Forklift$recordsArgs<ExtArgs> = {}>(args?: Subset<T, Forklift$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Forklift model
   */
  interface ForkliftFieldRefs {
    readonly id: FieldRef<"Forklift", 'Int'>
    readonly brand: FieldRef<"Forklift", 'String'>
    readonly type: FieldRef<"Forklift", 'String'>
    readonly eq_no: FieldRef<"Forklift", 'String'>
    readonly serial: FieldRef<"Forklift", 'String'>
    readonly location: FieldRef<"Forklift", 'String'>
    readonly powertrain: FieldRef<"Forklift", 'String'>
    readonly owner: FieldRef<"Forklift", 'String'>
    readonly tahun: FieldRef<"Forklift", 'Int'>
    readonly status: FieldRef<"Forklift", 'String'>
    readonly created_at: FieldRef<"Forklift", 'DateTime'>
    readonly updated_at: FieldRef<"Forklift", 'DateTime'>
    readonly deleted_at: FieldRef<"Forklift", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Forklift findUnique
   */
  export type ForkliftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
    /**
     * Filter, which Forklift to fetch.
     */
    where: ForkliftWhereUniqueInput
  }

  /**
   * Forklift findUniqueOrThrow
   */
  export type ForkliftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
    /**
     * Filter, which Forklift to fetch.
     */
    where: ForkliftWhereUniqueInput
  }

  /**
   * Forklift findFirst
   */
  export type ForkliftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
    /**
     * Filter, which Forklift to fetch.
     */
    where?: ForkliftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Forklifts to fetch.
     */
    orderBy?: ForkliftOrderByWithRelationInput | ForkliftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Forklifts.
     */
    cursor?: ForkliftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Forklifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Forklifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Forklifts.
     */
    distinct?: ForkliftScalarFieldEnum | ForkliftScalarFieldEnum[]
  }

  /**
   * Forklift findFirstOrThrow
   */
  export type ForkliftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
    /**
     * Filter, which Forklift to fetch.
     */
    where?: ForkliftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Forklifts to fetch.
     */
    orderBy?: ForkliftOrderByWithRelationInput | ForkliftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Forklifts.
     */
    cursor?: ForkliftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Forklifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Forklifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Forklifts.
     */
    distinct?: ForkliftScalarFieldEnum | ForkliftScalarFieldEnum[]
  }

  /**
   * Forklift findMany
   */
  export type ForkliftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
    /**
     * Filter, which Forklifts to fetch.
     */
    where?: ForkliftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Forklifts to fetch.
     */
    orderBy?: ForkliftOrderByWithRelationInput | ForkliftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Forklifts.
     */
    cursor?: ForkliftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Forklifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Forklifts.
     */
    skip?: number
    distinct?: ForkliftScalarFieldEnum | ForkliftScalarFieldEnum[]
  }

  /**
   * Forklift create
   */
  export type ForkliftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
    /**
     * The data needed to create a Forklift.
     */
    data: XOR<ForkliftCreateInput, ForkliftUncheckedCreateInput>
  }

  /**
   * Forklift createMany
   */
  export type ForkliftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Forklifts.
     */
    data: ForkliftCreateManyInput | ForkliftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Forklift update
   */
  export type ForkliftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
    /**
     * The data needed to update a Forklift.
     */
    data: XOR<ForkliftUpdateInput, ForkliftUncheckedUpdateInput>
    /**
     * Choose, which Forklift to update.
     */
    where: ForkliftWhereUniqueInput
  }

  /**
   * Forklift updateMany
   */
  export type ForkliftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Forklifts.
     */
    data: XOR<ForkliftUpdateManyMutationInput, ForkliftUncheckedUpdateManyInput>
    /**
     * Filter which Forklifts to update
     */
    where?: ForkliftWhereInput
    /**
     * Limit how many Forklifts to update.
     */
    limit?: number
  }

  /**
   * Forklift upsert
   */
  export type ForkliftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
    /**
     * The filter to search for the Forklift to update in case it exists.
     */
    where: ForkliftWhereUniqueInput
    /**
     * In case the Forklift found by the `where` argument doesn't exist, create a new Forklift with this data.
     */
    create: XOR<ForkliftCreateInput, ForkliftUncheckedCreateInput>
    /**
     * In case the Forklift was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForkliftUpdateInput, ForkliftUncheckedUpdateInput>
  }

  /**
   * Forklift delete
   */
  export type ForkliftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
    /**
     * Filter which Forklift to delete.
     */
    where: ForkliftWhereUniqueInput
  }

  /**
   * Forklift deleteMany
   */
  export type ForkliftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Forklifts to delete
     */
    where?: ForkliftWhereInput
    /**
     * Limit how many Forklifts to delete.
     */
    limit?: number
  }

  /**
   * Forklift.jobs
   */
  export type Forklift$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Forklift.records
   */
  export type Forklift$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    where?: RecordWhereInput
    orderBy?: RecordOrderByWithRelationInput | RecordOrderByWithRelationInput[]
    cursor?: RecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecordScalarFieldEnum | RecordScalarFieldEnum[]
  }

  /**
   * Forklift without action
   */
  export type ForkliftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forklift
     */
    select?: ForkliftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Forklift
     */
    omit?: ForkliftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForkliftInclude<ExtArgs> | null
  }


  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    id: number | null
  }

  export type ItemSumAggregateOutputType = {
    id: number | null
  }

  export type ItemMinAggregateOutputType = {
    id: number | null
    code: string | null
    nama: string | null
    unit: string | null
    description: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ItemMaxAggregateOutputType = {
    id: number | null
    code: string | null
    nama: string | null
    unit: string | null
    description: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ItemCountAggregateOutputType = {
    id: number
    code: number
    nama: number
    unit: number
    description: number
    status: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    id?: true
  }

  export type ItemSumAggregateInputType = {
    id?: true
  }

  export type ItemMinAggregateInputType = {
    id?: true
    code?: true
    nama?: true
    unit?: true
    description?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ItemMaxAggregateInputType = {
    id?: true
    code?: true
    nama?: true
    unit?: true
    description?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ItemCountAggregateInputType = {
    id?: true
    code?: true
    nama?: true
    unit?: true
    description?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    id: number
    code: string
    nama: string | null
    unit: string | null
    description: string | null
    status: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nama?: boolean
    unit?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["item"]>



  export type ItemSelectScalar = {
    id?: boolean
    code?: boolean
    nama?: boolean
    unit?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type ItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "nama" | "unit" | "description" | "status" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["item"]>

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      nama: string | null
      unit: string | null
      description: string | null
      status: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Item model
   */
  interface ItemFieldRefs {
    readonly id: FieldRef<"Item", 'Int'>
    readonly code: FieldRef<"Item", 'String'>
    readonly nama: FieldRef<"Item", 'String'>
    readonly unit: FieldRef<"Item", 'String'>
    readonly description: FieldRef<"Item", 'String'>
    readonly status: FieldRef<"Item", 'String'>
    readonly created_at: FieldRef<"Item", 'DateTime'>
    readonly updated_at: FieldRef<"Item", 'DateTime'>
    readonly deleted_at: FieldRef<"Item", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to delete.
     */
    limit?: number
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    id: number | null
    forklift_id: number | null
  }

  export type JobSumAggregateOutputType = {
    id: number | null
    forklift_id: number | null
  }

  export type JobMinAggregateOutputType = {
    id: number | null
    jenis: string | null
    forklift_id: number | null
    tanggal: string | null
    teknisi: string | null
    report_no: string | null
    description: string | null
    recommendation: string | null
    items_used: string | null
    next_pm: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: number | null
    jenis: string | null
    forklift_id: number | null
    tanggal: string | null
    teknisi: string | null
    report_no: string | null
    description: string | null
    recommendation: string | null
    items_used: string | null
    next_pm: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    jenis: number
    forklift_id: number
    tanggal: number
    teknisi: number
    report_no: number
    description: number
    recommendation: number
    items_used: number
    next_pm: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    id?: true
    forklift_id?: true
  }

  export type JobSumAggregateInputType = {
    id?: true
    forklift_id?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    jenis?: true
    forklift_id?: true
    tanggal?: true
    teknisi?: true
    report_no?: true
    description?: true
    recommendation?: true
    items_used?: true
    next_pm?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    jenis?: true
    forklift_id?: true
    tanggal?: true
    teknisi?: true
    report_no?: true
    description?: true
    recommendation?: true
    items_used?: true
    next_pm?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    jenis?: true
    forklift_id?: true
    tanggal?: true
    teknisi?: true
    report_no?: true
    description?: true
    recommendation?: true
    items_used?: true
    next_pm?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: number
    jenis: string | null
    forklift_id: number
    tanggal: string
    teknisi: string | null
    report_no: string | null
    description: string | null
    recommendation: string | null
    items_used: string | null
    next_pm: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jenis?: boolean
    forklift_id?: boolean
    tanggal?: boolean
    teknisi?: boolean
    report_no?: boolean
    description?: boolean
    recommendation?: boolean
    items_used?: boolean
    next_pm?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    forklift?: boolean | ForkliftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>



  export type JobSelectScalar = {
    id?: boolean
    jenis?: boolean
    forklift_id?: boolean
    tanggal?: boolean
    teknisi?: boolean
    report_no?: boolean
    description?: boolean
    recommendation?: boolean
    items_used?: boolean
    next_pm?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jenis" | "forklift_id" | "tanggal" | "teknisi" | "report_no" | "description" | "recommendation" | "items_used" | "next_pm" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    forklift?: boolean | ForkliftDefaultArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      forklift: Prisma.$ForkliftPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      jenis: string | null
      forklift_id: number
      tanggal: string
      teknisi: string | null
      report_no: string | null
      description: string | null
      recommendation: string | null
      items_used: string | null
      next_pm: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    forklift<T extends ForkliftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ForkliftDefaultArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'Int'>
    readonly jenis: FieldRef<"Job", 'String'>
    readonly forklift_id: FieldRef<"Job", 'Int'>
    readonly tanggal: FieldRef<"Job", 'String'>
    readonly teknisi: FieldRef<"Job", 'String'>
    readonly report_no: FieldRef<"Job", 'String'>
    readonly description: FieldRef<"Job", 'String'>
    readonly recommendation: FieldRef<"Job", 'String'>
    readonly items_used: FieldRef<"Job", 'String'>
    readonly next_pm: FieldRef<"Job", 'String'>
    readonly created_at: FieldRef<"Job", 'DateTime'>
    readonly updated_at: FieldRef<"Job", 'DateTime'>
    readonly deleted_at: FieldRef<"Job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model Record
   */

  export type AggregateRecord = {
    _count: RecordCountAggregateOutputType | null
    _avg: RecordAvgAggregateOutputType | null
    _sum: RecordSumAggregateOutputType | null
    _min: RecordMinAggregateOutputType | null
    _max: RecordMaxAggregateOutputType | null
  }

  export type RecordAvgAggregateOutputType = {
    id: number | null
    forklift_id: number | null
  }

  export type RecordSumAggregateOutputType = {
    id: number | null
    forklift_id: number | null
  }

  export type RecordMinAggregateOutputType = {
    id: number | null
    tanggal: string | null
    report_no: string | null
    forklift_id: number | null
    pekerjaan: string | null
    teknisi: string | null
    description: string | null
    recommendation: string | null
    items_used: string | null
    location: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type RecordMaxAggregateOutputType = {
    id: number | null
    tanggal: string | null
    report_no: string | null
    forklift_id: number | null
    pekerjaan: string | null
    teknisi: string | null
    description: string | null
    recommendation: string | null
    items_used: string | null
    location: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type RecordCountAggregateOutputType = {
    id: number
    tanggal: number
    report_no: number
    forklift_id: number
    pekerjaan: number
    teknisi: number
    description: number
    recommendation: number
    items_used: number
    location: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type RecordAvgAggregateInputType = {
    id?: true
    forklift_id?: true
  }

  export type RecordSumAggregateInputType = {
    id?: true
    forklift_id?: true
  }

  export type RecordMinAggregateInputType = {
    id?: true
    tanggal?: true
    report_no?: true
    forklift_id?: true
    pekerjaan?: true
    teknisi?: true
    description?: true
    recommendation?: true
    items_used?: true
    location?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type RecordMaxAggregateInputType = {
    id?: true
    tanggal?: true
    report_no?: true
    forklift_id?: true
    pekerjaan?: true
    teknisi?: true
    description?: true
    recommendation?: true
    items_used?: true
    location?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type RecordCountAggregateInputType = {
    id?: true
    tanggal?: true
    report_no?: true
    forklift_id?: true
    pekerjaan?: true
    teknisi?: true
    description?: true
    recommendation?: true
    items_used?: true
    location?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type RecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Record to aggregate.
     */
    where?: RecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Records to fetch.
     */
    orderBy?: RecordOrderByWithRelationInput | RecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Records
    **/
    _count?: true | RecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecordMaxAggregateInputType
  }

  export type GetRecordAggregateType<T extends RecordAggregateArgs> = {
        [P in keyof T & keyof AggregateRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecord[P]>
      : GetScalarType<T[P], AggregateRecord[P]>
  }




  export type RecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordWhereInput
    orderBy?: RecordOrderByWithAggregationInput | RecordOrderByWithAggregationInput[]
    by: RecordScalarFieldEnum[] | RecordScalarFieldEnum
    having?: RecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecordCountAggregateInputType | true
    _avg?: RecordAvgAggregateInputType
    _sum?: RecordSumAggregateInputType
    _min?: RecordMinAggregateInputType
    _max?: RecordMaxAggregateInputType
  }

  export type RecordGroupByOutputType = {
    id: number
    tanggal: string
    report_no: string | null
    forklift_id: number
    pekerjaan: string
    teknisi: string | null
    description: string | null
    recommendation: string | null
    items_used: string | null
    location: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: RecordCountAggregateOutputType | null
    _avg: RecordAvgAggregateOutputType | null
    _sum: RecordSumAggregateOutputType | null
    _min: RecordMinAggregateOutputType | null
    _max: RecordMaxAggregateOutputType | null
  }

  type GetRecordGroupByPayload<T extends RecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecordGroupByOutputType[P]>
            : GetScalarType<T[P], RecordGroupByOutputType[P]>
        }
      >
    >


  export type RecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    report_no?: boolean
    forklift_id?: boolean
    pekerjaan?: boolean
    teknisi?: boolean
    description?: boolean
    recommendation?: boolean
    items_used?: boolean
    location?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    forklift?: boolean | ForkliftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["record"]>



  export type RecordSelectScalar = {
    id?: boolean
    tanggal?: boolean
    report_no?: boolean
    forklift_id?: boolean
    pekerjaan?: boolean
    teknisi?: boolean
    description?: boolean
    recommendation?: boolean
    items_used?: boolean
    location?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type RecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tanggal" | "report_no" | "forklift_id" | "pekerjaan" | "teknisi" | "description" | "recommendation" | "items_used" | "location" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["record"]>
  export type RecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    forklift?: boolean | ForkliftDefaultArgs<ExtArgs>
  }

  export type $RecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Record"
    objects: {
      forklift: Prisma.$ForkliftPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tanggal: string
      report_no: string | null
      forklift_id: number
      pekerjaan: string
      teknisi: string | null
      description: string | null
      recommendation: string | null
      items_used: string | null
      location: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["record"]>
    composites: {}
  }

  type RecordGetPayload<S extends boolean | null | undefined | RecordDefaultArgs> = $Result.GetResult<Prisma.$RecordPayload, S>

  type RecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecordCountAggregateInputType | true
    }

  export interface RecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Record'], meta: { name: 'Record' } }
    /**
     * Find zero or one Record that matches the filter.
     * @param {RecordFindUniqueArgs} args - Arguments to find a Record
     * @example
     * // Get one Record
     * const record = await prisma.record.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecordFindUniqueArgs>(args: SelectSubset<T, RecordFindUniqueArgs<ExtArgs>>): Prisma__RecordClient<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Record that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecordFindUniqueOrThrowArgs} args - Arguments to find a Record
     * @example
     * // Get one Record
     * const record = await prisma.record.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecordFindUniqueOrThrowArgs>(args: SelectSubset<T, RecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecordClient<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Record that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordFindFirstArgs} args - Arguments to find a Record
     * @example
     * // Get one Record
     * const record = await prisma.record.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecordFindFirstArgs>(args?: SelectSubset<T, RecordFindFirstArgs<ExtArgs>>): Prisma__RecordClient<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Record that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordFindFirstOrThrowArgs} args - Arguments to find a Record
     * @example
     * // Get one Record
     * const record = await prisma.record.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecordFindFirstOrThrowArgs>(args?: SelectSubset<T, RecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecordClient<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Records that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Records
     * const records = await prisma.record.findMany()
     * 
     * // Get first 10 Records
     * const records = await prisma.record.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recordWithIdOnly = await prisma.record.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecordFindManyArgs>(args?: SelectSubset<T, RecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Record.
     * @param {RecordCreateArgs} args - Arguments to create a Record.
     * @example
     * // Create one Record
     * const Record = await prisma.record.create({
     *   data: {
     *     // ... data to create a Record
     *   }
     * })
     * 
     */
    create<T extends RecordCreateArgs>(args: SelectSubset<T, RecordCreateArgs<ExtArgs>>): Prisma__RecordClient<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Records.
     * @param {RecordCreateManyArgs} args - Arguments to create many Records.
     * @example
     * // Create many Records
     * const record = await prisma.record.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecordCreateManyArgs>(args?: SelectSubset<T, RecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Record.
     * @param {RecordDeleteArgs} args - Arguments to delete one Record.
     * @example
     * // Delete one Record
     * const Record = await prisma.record.delete({
     *   where: {
     *     // ... filter to delete one Record
     *   }
     * })
     * 
     */
    delete<T extends RecordDeleteArgs>(args: SelectSubset<T, RecordDeleteArgs<ExtArgs>>): Prisma__RecordClient<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Record.
     * @param {RecordUpdateArgs} args - Arguments to update one Record.
     * @example
     * // Update one Record
     * const record = await prisma.record.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecordUpdateArgs>(args: SelectSubset<T, RecordUpdateArgs<ExtArgs>>): Prisma__RecordClient<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Records.
     * @param {RecordDeleteManyArgs} args - Arguments to filter Records to delete.
     * @example
     * // Delete a few Records
     * const { count } = await prisma.record.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecordDeleteManyArgs>(args?: SelectSubset<T, RecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Records
     * const record = await prisma.record.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecordUpdateManyArgs>(args: SelectSubset<T, RecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Record.
     * @param {RecordUpsertArgs} args - Arguments to update or create a Record.
     * @example
     * // Update or create a Record
     * const record = await prisma.record.upsert({
     *   create: {
     *     // ... data to create a Record
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Record we want to update
     *   }
     * })
     */
    upsert<T extends RecordUpsertArgs>(args: SelectSubset<T, RecordUpsertArgs<ExtArgs>>): Prisma__RecordClient<$Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordCountArgs} args - Arguments to filter Records to count.
     * @example
     * // Count the number of Records
     * const count = await prisma.record.count({
     *   where: {
     *     // ... the filter for the Records we want to count
     *   }
     * })
    **/
    count<T extends RecordCountArgs>(
      args?: Subset<T, RecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Record.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecordAggregateArgs>(args: Subset<T, RecordAggregateArgs>): Prisma.PrismaPromise<GetRecordAggregateType<T>>

    /**
     * Group by Record.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecordGroupByArgs['orderBy'] }
        : { orderBy?: RecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Record model
   */
  readonly fields: RecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Record.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    forklift<T extends ForkliftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ForkliftDefaultArgs<ExtArgs>>): Prisma__ForkliftClient<$Result.GetResult<Prisma.$ForkliftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Record model
   */
  interface RecordFieldRefs {
    readonly id: FieldRef<"Record", 'Int'>
    readonly tanggal: FieldRef<"Record", 'String'>
    readonly report_no: FieldRef<"Record", 'String'>
    readonly forklift_id: FieldRef<"Record", 'Int'>
    readonly pekerjaan: FieldRef<"Record", 'String'>
    readonly teknisi: FieldRef<"Record", 'String'>
    readonly description: FieldRef<"Record", 'String'>
    readonly recommendation: FieldRef<"Record", 'String'>
    readonly items_used: FieldRef<"Record", 'String'>
    readonly location: FieldRef<"Record", 'String'>
    readonly created_at: FieldRef<"Record", 'DateTime'>
    readonly updated_at: FieldRef<"Record", 'DateTime'>
    readonly deleted_at: FieldRef<"Record", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Record findUnique
   */
  export type RecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    /**
     * Filter, which Record to fetch.
     */
    where: RecordWhereUniqueInput
  }

  /**
   * Record findUniqueOrThrow
   */
  export type RecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    /**
     * Filter, which Record to fetch.
     */
    where: RecordWhereUniqueInput
  }

  /**
   * Record findFirst
   */
  export type RecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    /**
     * Filter, which Record to fetch.
     */
    where?: RecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Records to fetch.
     */
    orderBy?: RecordOrderByWithRelationInput | RecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Records.
     */
    cursor?: RecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Records.
     */
    distinct?: RecordScalarFieldEnum | RecordScalarFieldEnum[]
  }

  /**
   * Record findFirstOrThrow
   */
  export type RecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    /**
     * Filter, which Record to fetch.
     */
    where?: RecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Records to fetch.
     */
    orderBy?: RecordOrderByWithRelationInput | RecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Records.
     */
    cursor?: RecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Records.
     */
    distinct?: RecordScalarFieldEnum | RecordScalarFieldEnum[]
  }

  /**
   * Record findMany
   */
  export type RecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    /**
     * Filter, which Records to fetch.
     */
    where?: RecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Records to fetch.
     */
    orderBy?: RecordOrderByWithRelationInput | RecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Records.
     */
    cursor?: RecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Records.
     */
    skip?: number
    distinct?: RecordScalarFieldEnum | RecordScalarFieldEnum[]
  }

  /**
   * Record create
   */
  export type RecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    /**
     * The data needed to create a Record.
     */
    data: XOR<RecordCreateInput, RecordUncheckedCreateInput>
  }

  /**
   * Record createMany
   */
  export type RecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Records.
     */
    data: RecordCreateManyInput | RecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Record update
   */
  export type RecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    /**
     * The data needed to update a Record.
     */
    data: XOR<RecordUpdateInput, RecordUncheckedUpdateInput>
    /**
     * Choose, which Record to update.
     */
    where: RecordWhereUniqueInput
  }

  /**
   * Record updateMany
   */
  export type RecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Records.
     */
    data: XOR<RecordUpdateManyMutationInput, RecordUncheckedUpdateManyInput>
    /**
     * Filter which Records to update
     */
    where?: RecordWhereInput
    /**
     * Limit how many Records to update.
     */
    limit?: number
  }

  /**
   * Record upsert
   */
  export type RecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    /**
     * The filter to search for the Record to update in case it exists.
     */
    where: RecordWhereUniqueInput
    /**
     * In case the Record found by the `where` argument doesn't exist, create a new Record with this data.
     */
    create: XOR<RecordCreateInput, RecordUncheckedCreateInput>
    /**
     * In case the Record was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecordUpdateInput, RecordUncheckedUpdateInput>
  }

  /**
   * Record delete
   */
  export type RecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
    /**
     * Filter which Record to delete.
     */
    where: RecordWhereUniqueInput
  }

  /**
   * Record deleteMany
   */
  export type RecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Records to delete
     */
    where?: RecordWhereInput
    /**
     * Limit how many Records to delete.
     */
    limit?: number
  }

  /**
   * Record without action
   */
  export type RecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Record
     */
    select?: RecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Record
     */
    omit?: RecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ForkliftScalarFieldEnum: {
    id: 'id',
    brand: 'brand',
    type: 'type',
    eq_no: 'eq_no',
    serial: 'serial',
    location: 'location',
    powertrain: 'powertrain',
    owner: 'owner',
    tahun: 'tahun',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type ForkliftScalarFieldEnum = (typeof ForkliftScalarFieldEnum)[keyof typeof ForkliftScalarFieldEnum]


  export const ItemScalarFieldEnum: {
    id: 'id',
    code: 'code',
    nama: 'nama',
    unit: 'unit',
    description: 'description',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    jenis: 'jenis',
    forklift_id: 'forklift_id',
    tanggal: 'tanggal',
    teknisi: 'teknisi',
    report_no: 'report_no',
    description: 'description',
    recommendation: 'recommendation',
    items_used: 'items_used',
    next_pm: 'next_pm',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const RecordScalarFieldEnum: {
    id: 'id',
    tanggal: 'tanggal',
    report_no: 'report_no',
    forklift_id: 'forklift_id',
    pekerjaan: 'pekerjaan',
    teknisi: 'teknisi',
    description: 'description',
    recommendation: 'recommendation',
    items_used: 'items_used',
    location: 'location',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type RecordScalarFieldEnum = (typeof RecordScalarFieldEnum)[keyof typeof RecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    email: 'email',
    password: 'password',
    role: 'role',
    name: 'name'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const ForkliftOrderByRelevanceFieldEnum: {
    brand: 'brand',
    type: 'type',
    eq_no: 'eq_no',
    serial: 'serial',
    location: 'location',
    powertrain: 'powertrain',
    owner: 'owner',
    status: 'status'
  };

  export type ForkliftOrderByRelevanceFieldEnum = (typeof ForkliftOrderByRelevanceFieldEnum)[keyof typeof ForkliftOrderByRelevanceFieldEnum]


  export const ItemOrderByRelevanceFieldEnum: {
    code: 'code',
    nama: 'nama',
    unit: 'unit',
    description: 'description',
    status: 'status'
  };

  export type ItemOrderByRelevanceFieldEnum = (typeof ItemOrderByRelevanceFieldEnum)[keyof typeof ItemOrderByRelevanceFieldEnum]


  export const JobOrderByRelevanceFieldEnum: {
    jenis: 'jenis',
    tanggal: 'tanggal',
    teknisi: 'teknisi',
    report_no: 'report_no',
    description: 'description',
    recommendation: 'recommendation',
    items_used: 'items_used',
    next_pm: 'next_pm'
  };

  export type JobOrderByRelevanceFieldEnum = (typeof JobOrderByRelevanceFieldEnum)[keyof typeof JobOrderByRelevanceFieldEnum]


  export const RecordOrderByRelevanceFieldEnum: {
    tanggal: 'tanggal',
    report_no: 'report_no',
    pekerjaan: 'pekerjaan',
    teknisi: 'teknisi',
    description: 'description',
    recommendation: 'recommendation',
    items_used: 'items_used',
    location: 'location'
  };

  export type RecordOrderByRelevanceFieldEnum = (typeof RecordOrderByRelevanceFieldEnum)[keyof typeof RecordOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type ForkliftWhereInput = {
    AND?: ForkliftWhereInput | ForkliftWhereInput[]
    OR?: ForkliftWhereInput[]
    NOT?: ForkliftWhereInput | ForkliftWhereInput[]
    id?: IntFilter<"Forklift"> | number
    brand?: StringNullableFilter<"Forklift"> | string | null
    type?: StringNullableFilter<"Forklift"> | string | null
    eq_no?: StringNullableFilter<"Forklift"> | string | null
    serial?: StringNullableFilter<"Forklift"> | string | null
    location?: StringNullableFilter<"Forklift"> | string | null
    powertrain?: StringNullableFilter<"Forklift"> | string | null
    owner?: StringNullableFilter<"Forklift"> | string | null
    tahun?: IntNullableFilter<"Forklift"> | number | null
    status?: StringNullableFilter<"Forklift"> | string | null
    created_at?: DateTimeFilter<"Forklift"> | Date | string
    updated_at?: DateTimeFilter<"Forklift"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Forklift"> | Date | string | null
    jobs?: JobListRelationFilter
    records?: RecordListRelationFilter
  }

  export type ForkliftOrderByWithRelationInput = {
    id?: SortOrder
    brand?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    eq_no?: SortOrderInput | SortOrder
    serial?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    powertrain?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    tahun?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    jobs?: JobOrderByRelationAggregateInput
    records?: RecordOrderByRelationAggregateInput
    _relevance?: ForkliftOrderByRelevanceInput
  }

  export type ForkliftWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    eq_no?: string
    serial?: string
    AND?: ForkliftWhereInput | ForkliftWhereInput[]
    OR?: ForkliftWhereInput[]
    NOT?: ForkliftWhereInput | ForkliftWhereInput[]
    brand?: StringNullableFilter<"Forklift"> | string | null
    type?: StringNullableFilter<"Forklift"> | string | null
    location?: StringNullableFilter<"Forklift"> | string | null
    powertrain?: StringNullableFilter<"Forklift"> | string | null
    owner?: StringNullableFilter<"Forklift"> | string | null
    tahun?: IntNullableFilter<"Forklift"> | number | null
    status?: StringNullableFilter<"Forklift"> | string | null
    created_at?: DateTimeFilter<"Forklift"> | Date | string
    updated_at?: DateTimeFilter<"Forklift"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Forklift"> | Date | string | null
    jobs?: JobListRelationFilter
    records?: RecordListRelationFilter
  }, "id" | "eq_no" | "serial">

  export type ForkliftOrderByWithAggregationInput = {
    id?: SortOrder
    brand?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    eq_no?: SortOrderInput | SortOrder
    serial?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    powertrain?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    tahun?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: ForkliftCountOrderByAggregateInput
    _avg?: ForkliftAvgOrderByAggregateInput
    _max?: ForkliftMaxOrderByAggregateInput
    _min?: ForkliftMinOrderByAggregateInput
    _sum?: ForkliftSumOrderByAggregateInput
  }

  export type ForkliftScalarWhereWithAggregatesInput = {
    AND?: ForkliftScalarWhereWithAggregatesInput | ForkliftScalarWhereWithAggregatesInput[]
    OR?: ForkliftScalarWhereWithAggregatesInput[]
    NOT?: ForkliftScalarWhereWithAggregatesInput | ForkliftScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Forklift"> | number
    brand?: StringNullableWithAggregatesFilter<"Forklift"> | string | null
    type?: StringNullableWithAggregatesFilter<"Forklift"> | string | null
    eq_no?: StringNullableWithAggregatesFilter<"Forklift"> | string | null
    serial?: StringNullableWithAggregatesFilter<"Forklift"> | string | null
    location?: StringNullableWithAggregatesFilter<"Forklift"> | string | null
    powertrain?: StringNullableWithAggregatesFilter<"Forklift"> | string | null
    owner?: StringNullableWithAggregatesFilter<"Forklift"> | string | null
    tahun?: IntNullableWithAggregatesFilter<"Forklift"> | number | null
    status?: StringNullableWithAggregatesFilter<"Forklift"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Forklift"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Forklift"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Forklift"> | Date | string | null
  }

  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    id?: IntFilter<"Item"> | number
    code?: StringFilter<"Item"> | string
    nama?: StringNullableFilter<"Item"> | string | null
    unit?: StringNullableFilter<"Item"> | string | null
    description?: StringNullableFilter<"Item"> | string | null
    status?: StringNullableFilter<"Item"> | string | null
    created_at?: DateTimeFilter<"Item"> | Date | string
    updated_at?: DateTimeFilter<"Item"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Item"> | Date | string | null
  }

  export type ItemOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _relevance?: ItemOrderByRelevanceInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    nama?: StringNullableFilter<"Item"> | string | null
    unit?: StringNullableFilter<"Item"> | string | null
    description?: StringNullableFilter<"Item"> | string | null
    status?: StringNullableFilter<"Item"> | string | null
    created_at?: DateTimeFilter<"Item"> | Date | string
    updated_at?: DateTimeFilter<"Item"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Item"> | Date | string | null
  }, "id" | "code">

  export type ItemOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: ItemCountOrderByAggregateInput
    _avg?: ItemAvgOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
    _sum?: ItemSumOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Item"> | number
    code?: StringWithAggregatesFilter<"Item"> | string
    nama?: StringNullableWithAggregatesFilter<"Item"> | string | null
    unit?: StringNullableWithAggregatesFilter<"Item"> | string | null
    description?: StringNullableWithAggregatesFilter<"Item"> | string | null
    status?: StringNullableWithAggregatesFilter<"Item"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Item"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Item"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Item"> | Date | string | null
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: IntFilter<"Job"> | number
    jenis?: StringNullableFilter<"Job"> | string | null
    forklift_id?: IntFilter<"Job"> | number
    tanggal?: StringFilter<"Job"> | string
    teknisi?: StringNullableFilter<"Job"> | string | null
    report_no?: StringNullableFilter<"Job"> | string | null
    description?: StringNullableFilter<"Job"> | string | null
    recommendation?: StringNullableFilter<"Job"> | string | null
    items_used?: StringNullableFilter<"Job"> | string | null
    next_pm?: StringNullableFilter<"Job"> | string | null
    created_at?: DateTimeFilter<"Job"> | Date | string
    updated_at?: DateTimeFilter<"Job"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Job"> | Date | string | null
    forklift?: XOR<ForkliftScalarRelationFilter, ForkliftWhereInput>
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    jenis?: SortOrderInput | SortOrder
    forklift_id?: SortOrder
    tanggal?: SortOrder
    teknisi?: SortOrderInput | SortOrder
    report_no?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    recommendation?: SortOrderInput | SortOrder
    items_used?: SortOrderInput | SortOrder
    next_pm?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    forklift?: ForkliftOrderByWithRelationInput
    _relevance?: JobOrderByRelevanceInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    jenis?: StringNullableFilter<"Job"> | string | null
    forklift_id?: IntFilter<"Job"> | number
    tanggal?: StringFilter<"Job"> | string
    teknisi?: StringNullableFilter<"Job"> | string | null
    report_no?: StringNullableFilter<"Job"> | string | null
    description?: StringNullableFilter<"Job"> | string | null
    recommendation?: StringNullableFilter<"Job"> | string | null
    items_used?: StringNullableFilter<"Job"> | string | null
    next_pm?: StringNullableFilter<"Job"> | string | null
    created_at?: DateTimeFilter<"Job"> | Date | string
    updated_at?: DateTimeFilter<"Job"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Job"> | Date | string | null
    forklift?: XOR<ForkliftScalarRelationFilter, ForkliftWhereInput>
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    jenis?: SortOrderInput | SortOrder
    forklift_id?: SortOrder
    tanggal?: SortOrder
    teknisi?: SortOrderInput | SortOrder
    report_no?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    recommendation?: SortOrderInput | SortOrder
    items_used?: SortOrderInput | SortOrder
    next_pm?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Job"> | number
    jenis?: StringNullableWithAggregatesFilter<"Job"> | string | null
    forklift_id?: IntWithAggregatesFilter<"Job"> | number
    tanggal?: StringWithAggregatesFilter<"Job"> | string
    teknisi?: StringNullableWithAggregatesFilter<"Job"> | string | null
    report_no?: StringNullableWithAggregatesFilter<"Job"> | string | null
    description?: StringNullableWithAggregatesFilter<"Job"> | string | null
    recommendation?: StringNullableWithAggregatesFilter<"Job"> | string | null
    items_used?: StringNullableWithAggregatesFilter<"Job"> | string | null
    next_pm?: StringNullableWithAggregatesFilter<"Job"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Job"> | Date | string | null
  }

  export type RecordWhereInput = {
    AND?: RecordWhereInput | RecordWhereInput[]
    OR?: RecordWhereInput[]
    NOT?: RecordWhereInput | RecordWhereInput[]
    id?: IntFilter<"Record"> | number
    tanggal?: StringFilter<"Record"> | string
    report_no?: StringNullableFilter<"Record"> | string | null
    forklift_id?: IntFilter<"Record"> | number
    pekerjaan?: StringFilter<"Record"> | string
    teknisi?: StringNullableFilter<"Record"> | string | null
    description?: StringNullableFilter<"Record"> | string | null
    recommendation?: StringNullableFilter<"Record"> | string | null
    items_used?: StringNullableFilter<"Record"> | string | null
    location?: StringNullableFilter<"Record"> | string | null
    created_at?: DateTimeFilter<"Record"> | Date | string
    updated_at?: DateTimeFilter<"Record"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Record"> | Date | string | null
    forklift?: XOR<ForkliftScalarRelationFilter, ForkliftWhereInput>
  }

  export type RecordOrderByWithRelationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    report_no?: SortOrderInput | SortOrder
    forklift_id?: SortOrder
    pekerjaan?: SortOrder
    teknisi?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    recommendation?: SortOrderInput | SortOrder
    items_used?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    forklift?: ForkliftOrderByWithRelationInput
    _relevance?: RecordOrderByRelevanceInput
  }

  export type RecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RecordWhereInput | RecordWhereInput[]
    OR?: RecordWhereInput[]
    NOT?: RecordWhereInput | RecordWhereInput[]
    tanggal?: StringFilter<"Record"> | string
    report_no?: StringNullableFilter<"Record"> | string | null
    forklift_id?: IntFilter<"Record"> | number
    pekerjaan?: StringFilter<"Record"> | string
    teknisi?: StringNullableFilter<"Record"> | string | null
    description?: StringNullableFilter<"Record"> | string | null
    recommendation?: StringNullableFilter<"Record"> | string | null
    items_used?: StringNullableFilter<"Record"> | string | null
    location?: StringNullableFilter<"Record"> | string | null
    created_at?: DateTimeFilter<"Record"> | Date | string
    updated_at?: DateTimeFilter<"Record"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Record"> | Date | string | null
    forklift?: XOR<ForkliftScalarRelationFilter, ForkliftWhereInput>
  }, "id">

  export type RecordOrderByWithAggregationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    report_no?: SortOrderInput | SortOrder
    forklift_id?: SortOrder
    pekerjaan?: SortOrder
    teknisi?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    recommendation?: SortOrderInput | SortOrder
    items_used?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: RecordCountOrderByAggregateInput
    _avg?: RecordAvgOrderByAggregateInput
    _max?: RecordMaxOrderByAggregateInput
    _min?: RecordMinOrderByAggregateInput
    _sum?: RecordSumOrderByAggregateInput
  }

  export type RecordScalarWhereWithAggregatesInput = {
    AND?: RecordScalarWhereWithAggregatesInput | RecordScalarWhereWithAggregatesInput[]
    OR?: RecordScalarWhereWithAggregatesInput[]
    NOT?: RecordScalarWhereWithAggregatesInput | RecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Record"> | number
    tanggal?: StringWithAggregatesFilter<"Record"> | string
    report_no?: StringNullableWithAggregatesFilter<"Record"> | string | null
    forklift_id?: IntWithAggregatesFilter<"Record"> | number
    pekerjaan?: StringWithAggregatesFilter<"Record"> | string
    teknisi?: StringNullableWithAggregatesFilter<"Record"> | string | null
    description?: StringNullableWithAggregatesFilter<"Record"> | string | null
    recommendation?: StringNullableWithAggregatesFilter<"Record"> | string | null
    items_used?: StringNullableWithAggregatesFilter<"Record"> | string | null
    location?: StringNullableWithAggregatesFilter<"Record"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Record"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Record"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Record"> | Date | string | null
  }

  export type UserCreateInput = {
    email: string
    password: string
    role: string
    name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    role: string
    name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    role: string
    name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ForkliftCreateInput = {
    brand?: string | null
    type?: string | null
    eq_no?: string | null
    serial?: string | null
    location?: string | null
    powertrain?: string | null
    owner?: string | null
    tahun?: number | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    jobs?: JobCreateNestedManyWithoutForkliftInput
    records?: RecordCreateNestedManyWithoutForkliftInput
  }

  export type ForkliftUncheckedCreateInput = {
    id?: number
    brand?: string | null
    type?: string | null
    eq_no?: string | null
    serial?: string | null
    location?: string | null
    powertrain?: string | null
    owner?: string | null
    tahun?: number | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    jobs?: JobUncheckedCreateNestedManyWithoutForkliftInput
    records?: RecordUncheckedCreateNestedManyWithoutForkliftInput
  }

  export type ForkliftUpdateInput = {
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    eq_no?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    powertrain?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    tahun?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobs?: JobUpdateManyWithoutForkliftNestedInput
    records?: RecordUpdateManyWithoutForkliftNestedInput
  }

  export type ForkliftUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    eq_no?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    powertrain?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    tahun?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobs?: JobUncheckedUpdateManyWithoutForkliftNestedInput
    records?: RecordUncheckedUpdateManyWithoutForkliftNestedInput
  }

  export type ForkliftCreateManyInput = {
    id?: number
    brand?: string | null
    type?: string | null
    eq_no?: string | null
    serial?: string | null
    location?: string | null
    powertrain?: string | null
    owner?: string | null
    tahun?: number | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ForkliftUpdateManyMutationInput = {
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    eq_no?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    powertrain?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    tahun?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ForkliftUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    eq_no?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    powertrain?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    tahun?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemCreateInput = {
    code: string
    nama?: string | null
    unit?: string | null
    description?: string | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ItemUncheckedCreateInput = {
    id?: number
    code: string
    nama?: string | null
    unit?: string | null
    description?: string | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ItemUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemCreateManyInput = {
    id?: number
    code: string
    nama?: string | null
    unit?: string | null
    description?: string | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ItemUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobCreateInput = {
    jenis?: string | null
    tanggal: string
    teknisi?: string | null
    report_no?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    next_pm?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    forklift: ForkliftCreateNestedOneWithoutJobsInput
  }

  export type JobUncheckedCreateInput = {
    id?: number
    jenis?: string | null
    forklift_id: number
    tanggal: string
    teknisi?: string | null
    report_no?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    next_pm?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type JobUpdateInput = {
    jenis?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    next_pm?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forklift?: ForkliftUpdateOneRequiredWithoutJobsNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: NullableStringFieldUpdateOperationsInput | string | null
    forklift_id?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    next_pm?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobCreateManyInput = {
    id?: number
    jenis?: string | null
    forklift_id: number
    tanggal: string
    teknisi?: string | null
    report_no?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    next_pm?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type JobUpdateManyMutationInput = {
    jenis?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    next_pm?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: NullableStringFieldUpdateOperationsInput | string | null
    forklift_id?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    next_pm?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordCreateInput = {
    tanggal: string
    report_no?: string | null
    pekerjaan: string
    teknisi?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    location?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    forklift: ForkliftCreateNestedOneWithoutRecordsInput
  }

  export type RecordUncheckedCreateInput = {
    id?: number
    tanggal: string
    report_no?: string | null
    forklift_id: number
    pekerjaan: string
    teknisi?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    location?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type RecordUpdateInput = {
    tanggal?: StringFieldUpdateOperationsInput | string
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    pekerjaan?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forklift?: ForkliftUpdateOneRequiredWithoutRecordsNestedInput
  }

  export type RecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    forklift_id?: IntFieldUpdateOperationsInput | number
    pekerjaan?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordCreateManyInput = {
    id?: number
    tanggal: string
    report_no?: string | null
    forklift_id: number
    pekerjaan: string
    teknisi?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    location?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type RecordUpdateManyMutationInput = {
    tanggal?: StringFieldUpdateOperationsInput | string
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    pekerjaan?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    forklift_id?: IntFieldUpdateOperationsInput | number
    pekerjaan?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type RecordListRelationFilter = {
    every?: RecordWhereInput
    some?: RecordWhereInput
    none?: RecordWhereInput
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ForkliftOrderByRelevanceInput = {
    fields: ForkliftOrderByRelevanceFieldEnum | ForkliftOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ForkliftCountOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    eq_no?: SortOrder
    serial?: SortOrder
    location?: SortOrder
    powertrain?: SortOrder
    owner?: SortOrder
    tahun?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ForkliftAvgOrderByAggregateInput = {
    id?: SortOrder
    tahun?: SortOrder
  }

  export type ForkliftMaxOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    eq_no?: SortOrder
    serial?: SortOrder
    location?: SortOrder
    powertrain?: SortOrder
    owner?: SortOrder
    tahun?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ForkliftMinOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    eq_no?: SortOrder
    serial?: SortOrder
    location?: SortOrder
    powertrain?: SortOrder
    owner?: SortOrder
    tahun?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ForkliftSumOrderByAggregateInput = {
    id?: SortOrder
    tahun?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ItemOrderByRelevanceInput = {
    fields: ItemOrderByRelevanceFieldEnum | ItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ItemCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ItemAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ItemSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ForkliftScalarRelationFilter = {
    is?: ForkliftWhereInput
    isNot?: ForkliftWhereInput
  }

  export type JobOrderByRelevanceInput = {
    fields: JobOrderByRelevanceFieldEnum | JobOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    jenis?: SortOrder
    forklift_id?: SortOrder
    tanggal?: SortOrder
    teknisi?: SortOrder
    report_no?: SortOrder
    description?: SortOrder
    recommendation?: SortOrder
    items_used?: SortOrder
    next_pm?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    id?: SortOrder
    forklift_id?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    jenis?: SortOrder
    forklift_id?: SortOrder
    tanggal?: SortOrder
    teknisi?: SortOrder
    report_no?: SortOrder
    description?: SortOrder
    recommendation?: SortOrder
    items_used?: SortOrder
    next_pm?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    jenis?: SortOrder
    forklift_id?: SortOrder
    tanggal?: SortOrder
    teknisi?: SortOrder
    report_no?: SortOrder
    description?: SortOrder
    recommendation?: SortOrder
    items_used?: SortOrder
    next_pm?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    id?: SortOrder
    forklift_id?: SortOrder
  }

  export type RecordOrderByRelevanceInput = {
    fields: RecordOrderByRelevanceFieldEnum | RecordOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RecordCountOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    report_no?: SortOrder
    forklift_id?: SortOrder
    pekerjaan?: SortOrder
    teknisi?: SortOrder
    description?: SortOrder
    recommendation?: SortOrder
    items_used?: SortOrder
    location?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type RecordAvgOrderByAggregateInput = {
    id?: SortOrder
    forklift_id?: SortOrder
  }

  export type RecordMaxOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    report_no?: SortOrder
    forklift_id?: SortOrder
    pekerjaan?: SortOrder
    teknisi?: SortOrder
    description?: SortOrder
    recommendation?: SortOrder
    items_used?: SortOrder
    location?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type RecordMinOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    report_no?: SortOrder
    forklift_id?: SortOrder
    pekerjaan?: SortOrder
    teknisi?: SortOrder
    description?: SortOrder
    recommendation?: SortOrder
    items_used?: SortOrder
    location?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type RecordSumOrderByAggregateInput = {
    id?: SortOrder
    forklift_id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobCreateNestedManyWithoutForkliftInput = {
    create?: XOR<JobCreateWithoutForkliftInput, JobUncheckedCreateWithoutForkliftInput> | JobCreateWithoutForkliftInput[] | JobUncheckedCreateWithoutForkliftInput[]
    connectOrCreate?: JobCreateOrConnectWithoutForkliftInput | JobCreateOrConnectWithoutForkliftInput[]
    createMany?: JobCreateManyForkliftInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type RecordCreateNestedManyWithoutForkliftInput = {
    create?: XOR<RecordCreateWithoutForkliftInput, RecordUncheckedCreateWithoutForkliftInput> | RecordCreateWithoutForkliftInput[] | RecordUncheckedCreateWithoutForkliftInput[]
    connectOrCreate?: RecordCreateOrConnectWithoutForkliftInput | RecordCreateOrConnectWithoutForkliftInput[]
    createMany?: RecordCreateManyForkliftInputEnvelope
    connect?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutForkliftInput = {
    create?: XOR<JobCreateWithoutForkliftInput, JobUncheckedCreateWithoutForkliftInput> | JobCreateWithoutForkliftInput[] | JobUncheckedCreateWithoutForkliftInput[]
    connectOrCreate?: JobCreateOrConnectWithoutForkliftInput | JobCreateOrConnectWithoutForkliftInput[]
    createMany?: JobCreateManyForkliftInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type RecordUncheckedCreateNestedManyWithoutForkliftInput = {
    create?: XOR<RecordCreateWithoutForkliftInput, RecordUncheckedCreateWithoutForkliftInput> | RecordCreateWithoutForkliftInput[] | RecordUncheckedCreateWithoutForkliftInput[]
    connectOrCreate?: RecordCreateOrConnectWithoutForkliftInput | RecordCreateOrConnectWithoutForkliftInput[]
    createMany?: RecordCreateManyForkliftInputEnvelope
    connect?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobUpdateManyWithoutForkliftNestedInput = {
    create?: XOR<JobCreateWithoutForkliftInput, JobUncheckedCreateWithoutForkliftInput> | JobCreateWithoutForkliftInput[] | JobUncheckedCreateWithoutForkliftInput[]
    connectOrCreate?: JobCreateOrConnectWithoutForkliftInput | JobCreateOrConnectWithoutForkliftInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutForkliftInput | JobUpsertWithWhereUniqueWithoutForkliftInput[]
    createMany?: JobCreateManyForkliftInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutForkliftInput | JobUpdateWithWhereUniqueWithoutForkliftInput[]
    updateMany?: JobUpdateManyWithWhereWithoutForkliftInput | JobUpdateManyWithWhereWithoutForkliftInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type RecordUpdateManyWithoutForkliftNestedInput = {
    create?: XOR<RecordCreateWithoutForkliftInput, RecordUncheckedCreateWithoutForkliftInput> | RecordCreateWithoutForkliftInput[] | RecordUncheckedCreateWithoutForkliftInput[]
    connectOrCreate?: RecordCreateOrConnectWithoutForkliftInput | RecordCreateOrConnectWithoutForkliftInput[]
    upsert?: RecordUpsertWithWhereUniqueWithoutForkliftInput | RecordUpsertWithWhereUniqueWithoutForkliftInput[]
    createMany?: RecordCreateManyForkliftInputEnvelope
    set?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
    disconnect?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
    delete?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
    connect?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
    update?: RecordUpdateWithWhereUniqueWithoutForkliftInput | RecordUpdateWithWhereUniqueWithoutForkliftInput[]
    updateMany?: RecordUpdateManyWithWhereWithoutForkliftInput | RecordUpdateManyWithWhereWithoutForkliftInput[]
    deleteMany?: RecordScalarWhereInput | RecordScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutForkliftNestedInput = {
    create?: XOR<JobCreateWithoutForkliftInput, JobUncheckedCreateWithoutForkliftInput> | JobCreateWithoutForkliftInput[] | JobUncheckedCreateWithoutForkliftInput[]
    connectOrCreate?: JobCreateOrConnectWithoutForkliftInput | JobCreateOrConnectWithoutForkliftInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutForkliftInput | JobUpsertWithWhereUniqueWithoutForkliftInput[]
    createMany?: JobCreateManyForkliftInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutForkliftInput | JobUpdateWithWhereUniqueWithoutForkliftInput[]
    updateMany?: JobUpdateManyWithWhereWithoutForkliftInput | JobUpdateManyWithWhereWithoutForkliftInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type RecordUncheckedUpdateManyWithoutForkliftNestedInput = {
    create?: XOR<RecordCreateWithoutForkliftInput, RecordUncheckedCreateWithoutForkliftInput> | RecordCreateWithoutForkliftInput[] | RecordUncheckedCreateWithoutForkliftInput[]
    connectOrCreate?: RecordCreateOrConnectWithoutForkliftInput | RecordCreateOrConnectWithoutForkliftInput[]
    upsert?: RecordUpsertWithWhereUniqueWithoutForkliftInput | RecordUpsertWithWhereUniqueWithoutForkliftInput[]
    createMany?: RecordCreateManyForkliftInputEnvelope
    set?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
    disconnect?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
    delete?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
    connect?: RecordWhereUniqueInput | RecordWhereUniqueInput[]
    update?: RecordUpdateWithWhereUniqueWithoutForkliftInput | RecordUpdateWithWhereUniqueWithoutForkliftInput[]
    updateMany?: RecordUpdateManyWithWhereWithoutForkliftInput | RecordUpdateManyWithWhereWithoutForkliftInput[]
    deleteMany?: RecordScalarWhereInput | RecordScalarWhereInput[]
  }

  export type ForkliftCreateNestedOneWithoutJobsInput = {
    create?: XOR<ForkliftCreateWithoutJobsInput, ForkliftUncheckedCreateWithoutJobsInput>
    connectOrCreate?: ForkliftCreateOrConnectWithoutJobsInput
    connect?: ForkliftWhereUniqueInput
  }

  export type ForkliftUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<ForkliftCreateWithoutJobsInput, ForkliftUncheckedCreateWithoutJobsInput>
    connectOrCreate?: ForkliftCreateOrConnectWithoutJobsInput
    upsert?: ForkliftUpsertWithoutJobsInput
    connect?: ForkliftWhereUniqueInput
    update?: XOR<XOR<ForkliftUpdateToOneWithWhereWithoutJobsInput, ForkliftUpdateWithoutJobsInput>, ForkliftUncheckedUpdateWithoutJobsInput>
  }

  export type ForkliftCreateNestedOneWithoutRecordsInput = {
    create?: XOR<ForkliftCreateWithoutRecordsInput, ForkliftUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: ForkliftCreateOrConnectWithoutRecordsInput
    connect?: ForkliftWhereUniqueInput
  }

  export type ForkliftUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<ForkliftCreateWithoutRecordsInput, ForkliftUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: ForkliftCreateOrConnectWithoutRecordsInput
    upsert?: ForkliftUpsertWithoutRecordsInput
    connect?: ForkliftWhereUniqueInput
    update?: XOR<XOR<ForkliftUpdateToOneWithWhereWithoutRecordsInput, ForkliftUpdateWithoutRecordsInput>, ForkliftUncheckedUpdateWithoutRecordsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type JobCreateWithoutForkliftInput = {
    jenis?: string | null
    tanggal: string
    teknisi?: string | null
    report_no?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    next_pm?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type JobUncheckedCreateWithoutForkliftInput = {
    id?: number
    jenis?: string | null
    tanggal: string
    teknisi?: string | null
    report_no?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    next_pm?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type JobCreateOrConnectWithoutForkliftInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutForkliftInput, JobUncheckedCreateWithoutForkliftInput>
  }

  export type JobCreateManyForkliftInputEnvelope = {
    data: JobCreateManyForkliftInput | JobCreateManyForkliftInput[]
    skipDuplicates?: boolean
  }

  export type RecordCreateWithoutForkliftInput = {
    tanggal: string
    report_no?: string | null
    pekerjaan: string
    teknisi?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    location?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type RecordUncheckedCreateWithoutForkliftInput = {
    id?: number
    tanggal: string
    report_no?: string | null
    pekerjaan: string
    teknisi?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    location?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type RecordCreateOrConnectWithoutForkliftInput = {
    where: RecordWhereUniqueInput
    create: XOR<RecordCreateWithoutForkliftInput, RecordUncheckedCreateWithoutForkliftInput>
  }

  export type RecordCreateManyForkliftInputEnvelope = {
    data: RecordCreateManyForkliftInput | RecordCreateManyForkliftInput[]
    skipDuplicates?: boolean
  }

  export type JobUpsertWithWhereUniqueWithoutForkliftInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutForkliftInput, JobUncheckedUpdateWithoutForkliftInput>
    create: XOR<JobCreateWithoutForkliftInput, JobUncheckedCreateWithoutForkliftInput>
  }

  export type JobUpdateWithWhereUniqueWithoutForkliftInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutForkliftInput, JobUncheckedUpdateWithoutForkliftInput>
  }

  export type JobUpdateManyWithWhereWithoutForkliftInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutForkliftInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: IntFilter<"Job"> | number
    jenis?: StringNullableFilter<"Job"> | string | null
    forklift_id?: IntFilter<"Job"> | number
    tanggal?: StringFilter<"Job"> | string
    teknisi?: StringNullableFilter<"Job"> | string | null
    report_no?: StringNullableFilter<"Job"> | string | null
    description?: StringNullableFilter<"Job"> | string | null
    recommendation?: StringNullableFilter<"Job"> | string | null
    items_used?: StringNullableFilter<"Job"> | string | null
    next_pm?: StringNullableFilter<"Job"> | string | null
    created_at?: DateTimeFilter<"Job"> | Date | string
    updated_at?: DateTimeFilter<"Job"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Job"> | Date | string | null
  }

  export type RecordUpsertWithWhereUniqueWithoutForkliftInput = {
    where: RecordWhereUniqueInput
    update: XOR<RecordUpdateWithoutForkliftInput, RecordUncheckedUpdateWithoutForkliftInput>
    create: XOR<RecordCreateWithoutForkliftInput, RecordUncheckedCreateWithoutForkliftInput>
  }

  export type RecordUpdateWithWhereUniqueWithoutForkliftInput = {
    where: RecordWhereUniqueInput
    data: XOR<RecordUpdateWithoutForkliftInput, RecordUncheckedUpdateWithoutForkliftInput>
  }

  export type RecordUpdateManyWithWhereWithoutForkliftInput = {
    where: RecordScalarWhereInput
    data: XOR<RecordUpdateManyMutationInput, RecordUncheckedUpdateManyWithoutForkliftInput>
  }

  export type RecordScalarWhereInput = {
    AND?: RecordScalarWhereInput | RecordScalarWhereInput[]
    OR?: RecordScalarWhereInput[]
    NOT?: RecordScalarWhereInput | RecordScalarWhereInput[]
    id?: IntFilter<"Record"> | number
    tanggal?: StringFilter<"Record"> | string
    report_no?: StringNullableFilter<"Record"> | string | null
    forklift_id?: IntFilter<"Record"> | number
    pekerjaan?: StringFilter<"Record"> | string
    teknisi?: StringNullableFilter<"Record"> | string | null
    description?: StringNullableFilter<"Record"> | string | null
    recommendation?: StringNullableFilter<"Record"> | string | null
    items_used?: StringNullableFilter<"Record"> | string | null
    location?: StringNullableFilter<"Record"> | string | null
    created_at?: DateTimeFilter<"Record"> | Date | string
    updated_at?: DateTimeFilter<"Record"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Record"> | Date | string | null
  }

  export type ForkliftCreateWithoutJobsInput = {
    brand?: string | null
    type?: string | null
    eq_no?: string | null
    serial?: string | null
    location?: string | null
    powertrain?: string | null
    owner?: string | null
    tahun?: number | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    records?: RecordCreateNestedManyWithoutForkliftInput
  }

  export type ForkliftUncheckedCreateWithoutJobsInput = {
    id?: number
    brand?: string | null
    type?: string | null
    eq_no?: string | null
    serial?: string | null
    location?: string | null
    powertrain?: string | null
    owner?: string | null
    tahun?: number | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    records?: RecordUncheckedCreateNestedManyWithoutForkliftInput
  }

  export type ForkliftCreateOrConnectWithoutJobsInput = {
    where: ForkliftWhereUniqueInput
    create: XOR<ForkliftCreateWithoutJobsInput, ForkliftUncheckedCreateWithoutJobsInput>
  }

  export type ForkliftUpsertWithoutJobsInput = {
    update: XOR<ForkliftUpdateWithoutJobsInput, ForkliftUncheckedUpdateWithoutJobsInput>
    create: XOR<ForkliftCreateWithoutJobsInput, ForkliftUncheckedCreateWithoutJobsInput>
    where?: ForkliftWhereInput
  }

  export type ForkliftUpdateToOneWithWhereWithoutJobsInput = {
    where?: ForkliftWhereInput
    data: XOR<ForkliftUpdateWithoutJobsInput, ForkliftUncheckedUpdateWithoutJobsInput>
  }

  export type ForkliftUpdateWithoutJobsInput = {
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    eq_no?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    powertrain?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    tahun?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    records?: RecordUpdateManyWithoutForkliftNestedInput
  }

  export type ForkliftUncheckedUpdateWithoutJobsInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    eq_no?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    powertrain?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    tahun?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    records?: RecordUncheckedUpdateManyWithoutForkliftNestedInput
  }

  export type ForkliftCreateWithoutRecordsInput = {
    brand?: string | null
    type?: string | null
    eq_no?: string | null
    serial?: string | null
    location?: string | null
    powertrain?: string | null
    owner?: string | null
    tahun?: number | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    jobs?: JobCreateNestedManyWithoutForkliftInput
  }

  export type ForkliftUncheckedCreateWithoutRecordsInput = {
    id?: number
    brand?: string | null
    type?: string | null
    eq_no?: string | null
    serial?: string | null
    location?: string | null
    powertrain?: string | null
    owner?: string | null
    tahun?: number | null
    status?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    jobs?: JobUncheckedCreateNestedManyWithoutForkliftInput
  }

  export type ForkliftCreateOrConnectWithoutRecordsInput = {
    where: ForkliftWhereUniqueInput
    create: XOR<ForkliftCreateWithoutRecordsInput, ForkliftUncheckedCreateWithoutRecordsInput>
  }

  export type ForkliftUpsertWithoutRecordsInput = {
    update: XOR<ForkliftUpdateWithoutRecordsInput, ForkliftUncheckedUpdateWithoutRecordsInput>
    create: XOR<ForkliftCreateWithoutRecordsInput, ForkliftUncheckedCreateWithoutRecordsInput>
    where?: ForkliftWhereInput
  }

  export type ForkliftUpdateToOneWithWhereWithoutRecordsInput = {
    where?: ForkliftWhereInput
    data: XOR<ForkliftUpdateWithoutRecordsInput, ForkliftUncheckedUpdateWithoutRecordsInput>
  }

  export type ForkliftUpdateWithoutRecordsInput = {
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    eq_no?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    powertrain?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    tahun?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobs?: JobUpdateManyWithoutForkliftNestedInput
  }

  export type ForkliftUncheckedUpdateWithoutRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    eq_no?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    powertrain?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    tahun?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobs?: JobUncheckedUpdateManyWithoutForkliftNestedInput
  }

  export type JobCreateManyForkliftInput = {
    id?: number
    jenis?: string | null
    tanggal: string
    teknisi?: string | null
    report_no?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    next_pm?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type RecordCreateManyForkliftInput = {
    id?: number
    tanggal: string
    report_no?: string | null
    pekerjaan: string
    teknisi?: string | null
    description?: string | null
    recommendation?: string | null
    items_used?: string | null
    location?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type JobUpdateWithoutForkliftInput = {
    jenis?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    next_pm?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobUncheckedUpdateWithoutForkliftInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    next_pm?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobUncheckedUpdateManyWithoutForkliftInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    next_pm?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordUpdateWithoutForkliftInput = {
    tanggal?: StringFieldUpdateOperationsInput | string
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    pekerjaan?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordUncheckedUpdateWithoutForkliftInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    pekerjaan?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordUncheckedUpdateManyWithoutForkliftInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    report_no?: NullableStringFieldUpdateOperationsInput | string | null
    pekerjaan?: StringFieldUpdateOperationsInput | string
    teknisi?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    items_used?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}