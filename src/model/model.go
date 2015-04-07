package model

import (
    "os"
    "time"

    _ "github.com/mattn/go-sqlite3"
    "github.com/naoina/genmai"

    "../env"
)

var (
    db *genmai.DB
)


type TimeLine struct {
    Id   int64  `db:"pk" json:"id"`
    Title string `json:"title"`
    StartTime time.Time `json:"startTime"`
    Minutes int64 `json:"minutes"`
    Description *string `json:"description"`
    Created time.Time `json:"created"`
    Updated time.Time `json:"updated"`
}

func (timeLine *TimeLine) BeforeInsert() error {
    n := time.Now()
    timeLine.Created = n
    timeLine.Updated = n
    return nil
}

func (timeLine *TimeLine) BeforeUpdate() error {
    n := time.Now()
    timeLine.Updated = n
    return nil
}

func GetAllTimeLines() *[]TimeLine {
    var ret []TimeLine
    if err := db.Select(&ret); err != nil {
        panic(err)
    }
    return &ret
}

func init() {
    var err error
    db, err = createDb()
    if err != nil {
        panic(err)
    }
    db.SetLogOutput(os.Stdout)
    if err := db.CreateTableIfNotExists(&TimeLine{}); err != nil {
        panic(err)
    }

    if env.IsDebugMode() {
        data := []TimeLine {
            TimeLine{ Title: "hoge", StartTime: time.Now(), Minutes: 30 },
            TimeLine{ Title: "piyo", StartTime: time.Now(), Minutes: 30 },
        }
        _, e1 := db.Insert(&data)
        if e1 != nil {
            panic(e1)
        }
    }
}

func createDb() (*genmai.DB, error) {
    switch env.DbKind() {
        case env.DbKindSQLite3:
            return genmai.New(&genmai.SQLite3Dialect{}, "./wl.db")
        case env.DbKindPostgreSQL:
            return genmai.New(&genmai.PostgresDialect{}, "host=" + env.PostgresHost() + " dbname=" + env.PostgresDbName() + " user=" + env.PostgresUser() + " password=" + env.PostgresPassword())
    }
    panic(env.DbKind())
}
