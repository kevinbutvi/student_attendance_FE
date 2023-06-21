import axios from "axios";

import { dateFormatter } from "../utils/dateFormater";

const API = "http://localhost:8000";

export const getStudentSummaryById = async (studenId, startDate, endDate) => {
  const isoStartDAte = dateFormatter(startDate);
  const isoEndDAte = dateFormatter(endDate);

  const { data } = await axios.get(`${API}/student/${studenId}?start_date=${isoStartDAte}&end_date=${isoEndDAte}`);
  return data;
};

export const getStudents = async (startDate, endDate, subjectId = 1) => {
  const isoStartDAte = dateFormatter(startDate);
  const isoEndDAte = dateFormatter(endDate);

  const { data } = await axios.get(`${API}/studentsList?start_date=${isoStartDAte}&end_date=${isoEndDAte}&subject_id=${subjectId}`);
  return data;
};
