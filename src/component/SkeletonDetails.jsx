import React from "react";
import { Container } from "react-bootstrap";

const SkeletonDetails = () => {
  return (
    <Container fluid className="detail-page-skeleton my-4">
      {/* Skeleton for Basic Details */}
      <div className="basic-details-skeleton text-center">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-meta"></div>
      </div>

      {/* Skeleton for Description */}
      <div className="skeleton-description text-center">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>

      {/* Skeleton for Accordian */}
      <div className="skeleton-accordian">
        <div className="skeleton skeleton-accordian-item"></div>
        <div className="skeleton skeleton-accordian-item"></div>
        <div className="skeleton skeleton-accordian-item"></div>
      </div>
    </Container>
  );
};

export default SkeletonDetails;
