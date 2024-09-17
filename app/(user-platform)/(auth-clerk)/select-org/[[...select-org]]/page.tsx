import { OrganizationList } from "@clerk/nextjs";

import React from "react";

type Props = {};

const SelectOrganizationPage = (props: Props) => {
  return (
    <div>
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl={"/organization/:id"}
        afterSelectOrganizationUrl={"/organization/:id"}
      />
    </div>
  );
};

export default SelectOrganizationPage;
