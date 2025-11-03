/**
 * todo : ㅌ₩payment 클래스 생성
 * 주문번호, 외국 통화 종류, 외국 통화 기준 결제 금액을 전달 받아서 다음의 정보를 더해 Payment를 생성한다
 * - 적용 환율
 * - 원화 환산 금액
 * - 원화 환산 금액 유효시간
 */
class Payment {
  private exRate: number = 0;
  private amountKWON: number = 0;
  private validUntil: Date = new Date();
  private orderId: string = '';
  private currencyType: string = '';
  private currencyAmount: number = 0;

  constructor() // amountKWON: number, // exRate: number,
  // orderId: string,
  // currencyType: string,
  // currencyAmount: number,
  // validUntil: Date
  {
    // this.exRate = exRate;
    // this.amountKWON = amountKWON;
    // this.validUntil = validUntil;
    // this.orderId = orderId;
    // this.currencyType = currencyType;
    // this.currencyAmount = currencyAmount;
  }

  //TODO : getter 생성
  //TODO : 정보들을  test할수 있는 toString 생성
}

class PaymentService {
  /**
   * TODO :주문번호, 외국 통화 종류, 외국 통화 기준 결제 금액을 전달 받아서, Payment를 생성한다.
   */

  prepare(): Payment {
    // todo: payment object  return
    // TODO : 환율 가져오기 - https://open.er-api.com/v6/latest/USD
    // TODO : 금액계산 - 외국통화기준결제금액 * 환율 = 원화
    // TODO : 유효시간 계산 - 현재 시간으로부터 30분까지만 유효시간으로 한다.
    return new Payment();
  }
}

export default PaymentService;
