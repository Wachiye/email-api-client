import { Button } from "react-bootstrap";

interface EmailPaginationProps {
  size?: 5 | 10 | 20 | 30 | 40 | 50 | number;
  onSizeChange: (size: number) => void;
  onPrev: () => void;
  onNext: () => void;
}
function EmailPagination({
  size = 10,
  onSizeChange,
  onNext,
  onPrev,
}: EmailPaginationProps) {
  return (
    <div className="align-items-center d-flex justify-content-end align-items-center gap-2">
      <select
        className="form-control form-control-sm d-inline-flex"
        name="limit"
        id="limit"
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        style={{width:"40px"}}
      >
        {[5, 10, 20, 30, 40, 50].map((limit, index) => (
          <option key={`limit-${index}`} value={limit}>
            {limit}
          </option>
        ))}
      </select>
      <Button variant="outline-dark" size="sm" onClick={onPrev}>
        Prev
      </Button>

      <Button variant="outline-dark" size="sm" onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

export default EmailPagination;
