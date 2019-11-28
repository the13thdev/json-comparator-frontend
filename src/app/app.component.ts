import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  database: JsonDatabase | null;
  dtOptions: DataTables.Settings = {};
  displayedColumns: string[] = ["test"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data = [{ test: "value" }];

  buckets: String[] = [];
  selectedBucket: String = "";
  jsonFiles: String[] = [];

  constructor(private _httpClient: HttpClient) { }

  onBucketChange(newBucket: String) {
    this.selectedBucket = newBucket;
    console.log("bucket changed to: " + newBucket);
    this.database.getJsonFilesForBucket(newBucket).subscribe(data => {
      console.log("jsonFiles received:")
      console.log(data)
      this.jsonFiles = data;
    })
  }

  onJsonFileChange(newJsonFile: String) {
    console.log("jsonFile changed to: " + newJsonFile);
    this.database.getJsonArray(this.selectedBucket, newJsonFile).subscribe(data => {
      console.log("json data received:")
      console.log(data)
      // console.log("cols:")
      // console.log(Object.keys(data[0]))
      this.displayedColumns = Object.keys(data[0]);
      this.columnsToDisplay = this.displayedColumns.slice();
      this.data = removeArraysFromObjs(data);
    })
  }


  ngOnInit() {
    this.dtOptions = {
      scrollX: true,
      scrollY: "300"
    };

    this.database = new JsonDatabase(this._httpClient);
    this.database.getBuckets().subscribe(data => {
      console.log("buckets received:")
      console.log(data)
      this.buckets = data;
    })

  }

}

var removeArraysFromObjs = function (arr) {
  var no_arr_objs = []
  arr.forEach(function (elem) {
    no_arr_objs.push(removeArraysFromObj(elem));
  })
  return no_arr_objs
}

var removeArraysFromObj = function (obj) {
  var noArrayObj = {}
  for (var prop in obj) {
    if (!Array.isArray(obj[prop])) {
      noArrayObj[prop] = obj[prop]
    }
  }
  return noArrayObj
}

/** Database that the data source uses to retrieve data for the table. */
export class JsonDatabase {
  constructor(private _httpClient: HttpClient) { }
  getJsonArray(bucket: String, jsonFile: String): Observable<any> {
    const requestUrl =
      `http://localhost:8080/getFile?bucket=` + bucket + `&file=` + jsonFile;
    return this._httpClient.get(requestUrl);
  }

  getBuckets(): Observable<any> {
    const requestUrl =
      `http://localhost:8080/buckets`;
    return this._httpClient.get(requestUrl);
  }

  getJsonFilesForBucket(bucket: String): Observable<any> {
    const requestUrl =
      `http://localhost:8080/listObjects?bucket=` + bucket;
    return this._httpClient.get(requestUrl);
  }
}