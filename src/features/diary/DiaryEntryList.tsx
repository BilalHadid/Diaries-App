import React, { FC, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer/rootReducer";
import http from "../../services/api";
import { Entry } from "../../interface/entry.interface";
import { setEntries } from "../entry/entrySlice";
import { setCurrentlyEditing, setCanEdit } from "../entry/editorSlice";
import dayjs from "dayjs";
import { useAppDispatch } from "../../store/store";

const DiaryEntriesList: FC = () => {
  const { entries } = useSelector((state: RootState) => state);
  console.log(entries);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      http.get<Entry>(`/diaries/entries/${id}`).then(({ entries }: any) => {
        if (entries) {
          const sortByLastUpdated = entries.sort((a: any, b: any) => {
            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
          });
          dispatch(setEntries(sortByLastUpdated));
        }
      });
    }
  }, [id, dispatch]);
  console.log(entries);
  return (
    <div className="entries">
      <header>
        <Link to="/">
          <h3>← Go Back</h3>
        </Link>
      </header>
      <ul>
        {entries.map((entry) => (
          <li
            key={entry.id}
            onClick={() => {
              dispatch(setCurrentlyEditing(entry));
              dispatch(setCanEdit(true));
            }}
          >
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryEntriesList;
