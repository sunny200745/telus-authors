export interface Author {

  "key"?:string,
  "type":string,
  "name":string,
  "top_work":string,
  "work_count": number,
  "_version_":number,
  "alternate_names": string[],
  "birth_date":string,
  "top_subjects":string[]
}

export interface AuthorWork {
  "links": {
    "self":string,
    "author": string,
    "next":string
  },
  "size":number,
  "entries" :[{
    "type":{},
    "title":string,
    "subjects":[],
    "authors":[],
    "subTitle":string,
    "key": string,
    "latest_revision": number,
    "revision": number,
    "created":{
      "type":string,
      "value": string
    },
    "last_modified":{
      "type":string,
      "value": string
    }
  }]
}
