import{usePreviousProps as e}from"@mui/utils";"use client";function useBadge(t){const{badgeContent:n,invisible:s=false,max:a=99,showZero:o=false}=t;const i=e({badgeContent:n,max:a});let l=s;s!==false||n!==0||o||(l=true);const{badgeContent:u,max:m=a}=l?i:t;const r=u&&Number(u)>m?`${m}+`:u;return{badgeContent:u,invisible:l,max:m,displayValue:r}}"use client";export{useBadge};

