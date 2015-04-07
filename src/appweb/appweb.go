package appweb

import (
    "net/http"

    "../model"
    "../webutil"
)

func HandleTimeLines(w http.ResponseWriter, r *http.Request) {
    timeLines := model.GetAllTimeLines();
    webutil.WriteJsonResponse(w, timeLines);
}
