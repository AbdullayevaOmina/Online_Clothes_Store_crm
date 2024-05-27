export interface ModalProps {
  open: boolean;
  handleClose: () => void;
}
// ---------------------------  Table ---------------------------

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface HeadTitle {
  key: string;
  value: string;
}

export interface Row {
  [key: string]: any;
}

interface Heder {
  title: string;
  value: string;
}

export interface Props {
  heders: Heder[];
  body: Body[];
  skelatonLoader: boolean;
  deletIdData: (id: string) => any;
}

// --------------------------- Table ---------------------------

// --------------------------- Pgination ---------------------------

export interface PaginationProps {
  totalCount: number;
  page: number;
  setParams: (value: number) => void;
}
// --------------------------- Pgination ---------------------------

export interface ProtectedRouteProps {
  element: JSX.Element;
}
