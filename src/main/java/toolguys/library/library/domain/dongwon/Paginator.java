package toolguys.library.library.domain.dongwon;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Paginator {
    private int currentPage;
    private int pageSize;
    private long totalCount;
    private int lastPageExp;
    private long totalPageCount;
    private int foreachStart;
    private int foreachEnd;
    private int modifiedTotalCount;

    public Paginator(int currentPage, int pageSize, long totalCount) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalCount = totalCount;

        this.totalPageCount = calTotalPageCount();
        this.lastPageExp = calLastPageExp();
        forEachStartAndEnd();
    }
    private long calTotalPageCount() {
        if(totalCount==0){
            return 1;
        }else {
            long tpc = totalCount / pageSize;
            if (totalCount % pageSize != 0) tpc++;
            return tpc;
        }
    }

    private int calLastPageExp() {
        return (int)totalCount%pageSize;
    }

    private void forEachStartAndEnd() {
        foreachStart = 1;
        foreachEnd = (int)totalPageCount;
        if (currentPage<=5 && totalPageCount>10) {
            foreachEnd = 10;
        } else if (currentPage > 5 && totalPageCount - currentPage >= 5) {
            foreachStart = currentPage - 4;
            foreachEnd = currentPage + 5;
        } else if (currentPage > 5 && totalPageCount > 9 && totalPageCount - currentPage < 5) {
            foreachStart = (int) totalPageCount - 9;
            foreachEnd = (int) totalPageCount;
        }
    }
}