import { CSSProperties, FC, MouseEventHandler } from "react";

interface SearchProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}

const Search: FC<SearchProps> = ({ className, style, onClick }) => {
  return (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
};

export default Search;
