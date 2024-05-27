import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import { HeadTitle, Row } from "@global-interface";
import { setDataToCookie } from "@token-service";
import Notification from "@notification";
import ConfirmationModal from "../modals/global/ConfirmationModal";

interface Props {
  rows: Row[];
  headTitles: HeadTitle[];
  deleteAction: (id: any) => void;
  singlePageName: string;
}

const GlobalTable: React.FC<Props> = ({
  rows,
  headTitles,
  deleteAction,
  singlePageName,
}: Props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handlePage = (id: string) => {
    setDataToCookie("id", id.toString());
    navigate(`/main/${singlePageName}/${id}`);
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      deleteAction(selectedId);
      Notification({ title: "Deleted", type: "success" });
      window.location.reload();
      setModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <TableContainer component={Paper} className="mt-5">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>T/R</TableCell>
            {headTitles.map((item) => (
              <TableCell key={item.key}>{item.value}</TableCell>
            ))}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows === null || rows === undefined ? (
            <TableRow>
              <TableCell colSpan={headTitles.length + 1} align="center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {headTitles.map((item, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className="cursor-pointer hover:text-indigo-600"
                    onClick={() => handlePage(row.id || row.product_id)}
                  >
                    {row[item.key]}
                  </TableCell>
                ))}
                <TableCell align="left" className="flex gap-3">
                  <button
                    onClick={() => handleDelete(row.id || row.product_id)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                  <button>
                    <ModeEditIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ConfirmationModal
        open={modalOpen}
        message="Are you sure you want to delete this item?"
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </TableContainer>
  );
};

export default GlobalTable;
