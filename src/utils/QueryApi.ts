class QueryApi {
    query: any;
    queryString: Record<string, any>;
  
    constructor(query: any, queryString: Record<string, any>) {
      this.query = query;
      this.queryString = queryString;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 30;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
    
        return this;
    }
    sort() {
      if (this.queryString.sort) {
        const sortString = this.queryString.sort.split(",").join(" ");
        this.query = this.query.sort(sortString);
      }
  
      return this;
    }
  
    limit() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(",").join(" ");
  
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select("-__v");
      }
  
      return this;
    }
    
  }
  
  export default QueryApi;
  