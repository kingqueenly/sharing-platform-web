/**
 * Created by paulliu on 2017/1/20.
 */

export class ChartData {
  public datas: ChartDataDetail[];
  public xAxis: string[];
}

export class ChartDataDetail {
  public label: string;
  public data: number[];
}
