import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import Loader from "../../../components/atoms/Loader";
import Dropdown from "../../../components/elements/common/Dropdown";
import { useGlobalSearchQuery } from "../../../feature/common/commonQuery";
import useDebounce from "../../../hooks/useDebounce";
import { Role } from "../../../types";

// const includeType = ["admin", "operator", "ad-partner", "event-manager"];

const keysAccess: { [key: string]: string[] } = {
  Employees: ["admin", "operator"],
  Assets: ["admin", "operator"],
  Stages: ["operator"],
  Route: ["operator"],
  Operator: ["admin", "operator"],
  EventManager: ["admin", "operator"],
  AdPartner: ["admin"],
  Vendors: ["admin"],
  Brands: ["admin"],
  POS: ["admin"],
};

const urlHelper = (cond: string, id: string, type: string) => {
  switch (cond) {
    case "Employees":
      return `/${type}/employee/view-employee/${id}`;
    case "Assets":
      return `/${type}/asset/view-asset/${id}`;
    case "Stages":
      return `/${type}/stage/view-stage/${id}`;
    case "Route":
      return `/${type}/route/view-route/${id}`;
    case "Operator":
      return `/${type}/operator/view-operator/${id}`;
    case "EventManager":
      return `/${type}/event-manager/view-event-manager/${id}`;
    case "AdPartner":
      return `/${type}/ad-partner/view-ad-partner/${id}`;
    case "Vendors":
      return `/${type}/business/view-business/${id}`;
    case "Brands":
      return `/${type}/brand/view-brand/${id}`;
    case "POS":
      return `/${type}/pos/view-pos/${id}`;
    default:
      return "/";
  }
};

const SearchBar = () => {
  // const dispatch = useAppDispatch();
  const { type } = useAppSelector((state) => state.auth);
  const [searchValue, setSearchValue] = React.useState("");
  const { value, onChange, setValue } = useDebounce(() => {
    setSearchValue(value);
  }, 1000);

  const { data, isLoading, isFetching } = useGlobalSearchQuery({
    data: {
      Keyword: searchValue,
    },
  });
  // console.log(`\n\n  isLoading:`, data, isLoading);
  // console.log(`\n\n type:`, type);
  const navigate = useNavigate();

  const renderName = (data: any, key: string) => {
    switch (key) {
      case "Employees":
        return data?.employee_name;
      case "Assets":
        return data?.asset_registration_number;
      case "Stages":
        return data?.stage_name;
      case "Route":
        return data?.RouteName;
      case "AdPartner":
        return data?.Name;
      case "Vendors":
        return data?.Name;
      case "Operator":
        return data?.CompanyName;
      case "EventManager":
        return data?.CompanyName;
      case "Brands":
        return data?.Title;
      case "POS":
        return data?.pos_imei;
      default:
        return null;
    }
  };

  // const renderType = (type: string) => {
  //   switch (type) {
  //     case "Employees":
  //       return "employee";
  //     case "Assets":
  //       return "asset";
  //     case "Stages":
  //       return "stage";
  //     case "Route":
  //       return "route";
  //     case "Operator":
  //       return "operator";
  //     case "EventManager":
  //       return "event-manager";
  //     case "AdPartner":
  //       return "ad-partner";
  //     case "Vendors":
  //       return "business";
  //     case "Brands":
  //       return "brand";
  //     case "POS":
  //       return "pos";
  //     default:
  //       return null;
  //   }
  // };

  // const getId = (data: any, key: string) => {
  //   switch (key) {
  //     case "Employees":
  //       return data?.employee_id;
  //     case "Assets":
  //       return data?.asset_registration_number;
  //     case "Stages":
  //       return data?.stage_id;
  //     case "Route":
  //       return data?.RouteID;
  //     case "Operator":
  //       return data?.ID;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={searchValue.length > 0}
        buttonClass="p-0"
        extraClass="min-w-[450px] left-0 top-[130%]"
        renderProps={() => (
          <div className="border rounded-md flex items-center overflow-hidden">
            <input
              className="border-0 py-1 px-2 outline-none"
              placeholder="Search..."
              onChange={onChange}
              value={value}
              type="text"
            />
            {isFetching && (
              <div className="px-2">
                <FaSpinner className="animate-spin duration-75" />
              </div>
            )}
          </div>
        )}
      >
        <div className="p-[2px] overflow-x-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Search Results</h3>
          </div>
          <ul
            className={`text-sm text-gray-700 max-h-[200px] flex flex-col gap-2`}
          >
            {isLoading ? (
              <Loader />
            ) : (
              Object?.entries(keysAccess)?.map(([key, value]) => {
                // console.log(`\n\n value:`, (data as any)?.[key]);
                if (
                  !value.includes(type as Role) ||
                  (data as any)?.[key]?.length === 0
                )
                  return null;
                return (
                  <li
                    key={key}
                    className="pt-2"
                    // onClick={() => navigate(`/${type}/${key.toLowerCase()}`)}
                  >
                    <h3 className="font-medium">{key}</h3>
                    {(data as any)?.[key]?.map((item: any, index: number) => {
                      return (
                        <ul
                          key={item?.ID}
                          className="my-2"
                          onClick={() => {
                            setSearchValue("");
                            setValue("");
                            navigate(urlHelper(key, item?.ID, type));
                          }}
                        >
                          <li className="p-2 hover:bg-gray-10 rounded-lg hover:bg-gray-100 cursor-pointer">
                            {index + 1}: {renderName(item, key)}
                          </li>
                        </ul>
                      );
                    })}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </Dropdown>
    </React.Fragment>
  );
};

export default SearchBar;
