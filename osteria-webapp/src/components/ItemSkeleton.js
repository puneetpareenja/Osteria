import React, { Component } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

class ItemSkeleton extends Component {
  render() {
    return (
      <div>
        <Skeleton variant="rect" width={280} height={200} />
        <Skeleton
          variant="rect"
          width={280}
          height={20}
          style={{ marginTop: 20 }}
        />
        <Skeleton variant="text" width={56} />
        <Skeleton variant="text" width={280} />
        <Skeleton variant="text" width={280} />
      </div>
    );
  }
}

export default ItemSkeleton;
