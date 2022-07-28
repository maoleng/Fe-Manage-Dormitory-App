import { useState, useEffect } from 'react';
import { Dropdown, Button, Modal, Table } from 'react-bootstrap';
import print from 'print-js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import CustomToggle from './CustomToggle';
import { useStore, actions } from '~/store';
import MyTable from '~/components/MyTable';
import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import { useGetElectricityWater, useGetElectricityWaters } from './hooks';
import { SearchSVG, CheckboxSVG, CheckboxSelectedSVG, CheckboxTickSVG, PrintSVG, DetailSVG, ReviewSVG, DownLoadSVG, PDFSVG } from './svgs';

function ElectricityWaters() {
  console.log('Page: ElectricityWater');

  const [state, dispatch] = useStore();
  const getElectricityWater = useGetElectricityWater();
  const getElectricityWaters = useGetElectricityWaters();

  const [printAll, setPrintAll] = useState(null);
  const [download, setDownload] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [bill, setBill] = useState(null);
  const [bills, setBills] = useState(null);
  const [search, setSearch] = useState({
    buildings: ['H', 'I', 'K', 'L'].map((elem, index) => ({ id: index + 1, title: `Tòa ${elem}`, selected: false })),
    floors: [...Array(20).keys()].map(x => ({ id: x + 1, title: `Tầng ${x + 1}`, selected: false })),
    years: [...Array(10).keys()].map(x => ({ id: x + 1, title: `Năm ${x + 2020}`, selected: false })),
    months: [...Array(12).keys()].map(x => ({ id: x + 1, title: `Tháng ${x + 1}`, selected: false })),
    status: ['Chưa nộp', 'Đã nộp'].map((title, index) => ({ id: index + 1, title, selected: false })),
  });

  const hiddenHandel = (type) => {
    if (type === 'detail') {
      setShowDetail(false);
    }
    else {
      setShowReview(false);
    }
    setBill(null);
  }

  const detailHandler = (id, type) => {
    if (type === 'detail') {
      setShowDetail(true);
    }
    else {
      setShowReview(true);
    }

    getElectricityWater.mutate(
      { id },
      {
        onSuccess(data) {
          // console.log(data);
          setBill(data.data);
        }
      }
    );
  }

  const searchHandle = () => {
    getElectricityWaters.mutate(
      {
        buildingID: search.buildings.filter(({ selected }) => selected)[0].id, 
        floorID: search.floors.filter(({ selected }) => selected)[0].id, 
        year: search.years.filter(({ selected }) => selected)[0].id, 
        month: search.months.filter(({ selected }) => selected)[0].id, 
        isPaid: search.status.filter(({ selected }) => selected)[0].id,
      },
      {
        onSuccess(data) {
          // console.log(data.data);
          setBills(data.data);
        }
      }
    )
  }

  const downloadPDFHandle = (id) => {
    if (bill === null) {
      getElectricityWater.mutate(
        { id },
        {
          onSuccess(data) {
            // console.log(data);
            setBill(data.data);
            setDownload(`${data.data.room_name}_${(new Date(data.data.pay_start_time).getUTCMonth() + 1)}_${(new Date(data.data.pay_start_time).getUTCFullYear() + 1)}`)
          }
        }
      );
    }
  }

  const printAllHandle = () => {
    setPrintAll(true);
  }

  useEffect(() => {
    if (printAll) {
      print({
        printable: 'review-all', 
        type: 'html',
        targetStyles: ['*'],
      });
      setPrintAll(false);
    }
  }, [printAll]);

  useEffect(() => {
    if (download !== null) {
      html2canvas(document.querySelector("#review")).then(canvas => {
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
        pdf.save(`${download}.pdf`); 
        setDownload(null);
        setBill(null);
      });
    }
  }, [download]);

  useEffect(() => {
    getElectricityWaters.mutate(
      {},
      {
        onSuccess(data) {
          // console.log(data.data);
          setBills(data.data);
        }
      }
    )
  }, []);
  
  // console.log(bills);
  // console.log(search);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', userSelect: 'none'}}>
        <div>
          <svg style={{ width: '24px', height: '24px', margin: '0px 16px', cursor: 'pointer' }} onClick={() => dispatch(actions.setIsOpenSidebar(!state.isOpenSidebar))} viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 20H0V16.6667H30V20ZM30 11.6667H0V8.33333H30V11.6667ZM30 3.33333H0V0H30V3.33333Z" fill="#06245E"/>
          </svg>  
        </div>
        <div style={{ width: '100%' }}>
          <MyNavbar isSite={false}></MyNavbar>
        </div>
      </div>
    
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        <div
          style={{
            width: '100%',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex', 
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Button style={{ width: '180px', }} onClick={printAllHandle} variant="primary">
                <PrintSVG style={{ width: '18px', height: '20px' }} /> In tất cả hóa đơn
              </Button>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>Tòa</Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {search.buildings.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setSearch({
                          ...search, 
                          buildings: search.buildings.map(building => ({...building, selected: building.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>Tầng</Dropdown.Toggle>
                <Dropdown.Menu>
                  <div 
                    style={{ 
                      width: '280px', 
                      padding: '0px 20px', 
                      margin: '0px auto',
                      display: 'grid', 
                      gridTemplateColumns: '50% 50%'
                    }}
                  >
                    {search.floors.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setSearch({
                          ...search, 
                          floors: search.floors.map(floor => ({...floor, selected: floor.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>Năm</Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {search.years.map(({ title, selected }) => (
                      <div 
                        style={{ 
                          margin: '4px 0px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          cursor: 'pointer' 
                        }} 
                        onClick={() => setSearch({
                          ...search, 
                          years: search.years.map(year => ({...year, selected: year.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>Tháng</Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {search.months.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setSearch({
                          ...search, 
                          months: search.months.map(month => ({...month, selected: month.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>Trạng thái</Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {search.status.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setSearch({
                          ...search, 
                          status: search.status.map(elem => ({...elem, selected: elem.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Button style={{ width: '120px', }} onClick={searchHandle} variant="primary">
                <SearchSVG style={{ width: '16px', height: '16px' }} /> Tìm kiếm
              </Button>
            </div>
          </div>

          {!bills ? <></> : (
            <MyTable forms={bills.map(({ subscription_id, room_name, electricity_count, water_count, price, pay_end_time, is_paid }) => ({
              room_name: {
                title: 'Tên phòng',
                content: room_name,
              },
              electricity_count: {
                title: 'Số điện',
                content: electricity_count,
              },
              water_count: {
                title: 'Số nước',
                content: water_count,
              },
              price: {
                title: 'Tổng tiền',
                content: price,
              },
              pay_end_time: {
                title: 'Hạn chót thanh toán',
                center: true,
                content: <div style={{ textAlign: 'center' }}>{pay_end_time}</div>
              },
              set_paid: {
                title: 'Đánh dấu thanh toán',
                center: true,
                content: <div style={{ textAlign: 'center' }}>
                  {is_paid
                    ? <CheckboxTickSVG style={{ width: '16px', height: '16px' }} />
                    : <CheckboxSVG style={{ width: '16px', height: '16px' }} />}
                </div>,
              },
              is_paid: {
                title: 'Xác nhận trả',
                content: is_paid ? 'Đã Thanh toán' : 'Chưa thanh toán',
              },
              controls: {
                title: '',
                content: (
                  <>
                    <span 
                      style={{ margin: '0px 4px', cursor: 'pointer', }} 
                      onClick={() => detailHandler(subscription_id, 'detail')}
                    >
                      <DetailSVG style={{ width: '20px', height: '20px' }} />
                    </span>
                    <span 
                      style={{ margin: '0px 4px', cursor: 'pointer', }} 
                      onClick={() => detailHandler(subscription_id, 'review')}
                    >
                      <ReviewSVG style={{ width: '20px', height: '20px' }} />
                    </span>
                    <span 
                      style={{ margin: '0px 4px', cursor: 'pointer', }}
                      onClick={() => downloadPDFHandle(subscription_id)}
                    >
                      <DownLoadSVG style={{ width: '20px', height: '20px' }} />
                    </span>
                  </>
                ),
              }
            }))}></MyTable>
          )}
        </div>
      </div>
      
      <Modal size="lg" show={showDetail} onHide={() => hiddenHandel('detail')}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div style={{ padding: '20px 80px' }}>
            {bill === null ? <>Loading...</> : (
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{ 
                    fontWeight: 'bold',
                    color: '#0B42AB',
                  }}
                >CHI TIẾT SỬ DỤNG ĐIỆN NƯỚC - Tháng {(new Date(bill.pay_start_time).getUTCMonth() + 1)}/{(new Date(bill.pay_start_time).getUTCFullYear() + 1)}</div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>Phòng:</span> {bill.room_name}
                </div>
                <Table>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Số điện</td>
                      <td>{bill.money.electricity_count}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Số nước</td>
                      <td>{bill.money.water_count}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Giá tiền 1kwh điện</td>
                      <td>{bill.money.money_per_kwh}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Giá tiền một lít nước</td>
                      <td>{bill.money.money_per_m3}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Tổng tiền nước</td>
                      <td>{bill.money.water_money}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Tổng tiền điện</td>
                      <td>{bill.money.electricity_money}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Tổng tiền thanh toán</td>
                      <td>{bill.money.total_money}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Hạn chót thanh toán</td>
                      <td>{bill.pay_end_time}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>ngày xuất hóa đơn</td>
                      <td>{bill.pay_start_time}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      
      <Modal size="lg" show={showReview} onHide={() => hiddenHandel('review')}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {bill === null ? <>Loading...</> : (
            <div style={{ padding: '20px 80px', textAlign: 'center' }}>
              <div style={{ width: '100%', margin: 'center' }}>
                <div style={{ fontWeight: 'bold' }}>TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG</div>
                <div style={{ fontWeight: 'bold' }}>KÝ TÚC XÁ</div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div style={{ fontWeight: 'bold' }}>THÔNG BÁO</div>
                <div style={{ fontWeight: 'bold' }}>Thu tiền phí sử dụng điện, nước ở ký túc xá - Tháng {(new Date(bill.pay_start_time).getUTCMonth() + 1)}/{(new Date(bill.pay_start_time).getUTCFullYear() + 1)}</div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div>
                  <span style={{ fontWeight: 'bold' }}>Phòng:</span> {bill.room_name}
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div
                  style={{ 
                    width: '400px',
                    padding: '8px',
                    margin: '0px auto',
                    border: 'solid #000000 1px', 
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div style={{ width: '70%', fontWeight: 'bold', }}>Tổng cộng</div>
                    <div style={{ width: '30%' }}>{bill.money.total_money}</div>
                  </div>

                  <div style={{ height: '.8px', margin: '12px 0px', backgroundColor: '#000000' }}></div>

                  <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <div style={{ display: 'grid', gridTemplateAreas: '"a b" "c d"', gap: '8px 16px', textAlign: 'left' }}>
                      <div>Hạn chót thanh toán</div>
                      <div>{bill.pay_end_time}</div>
                      <div>Ngày xuất hoá đơn</div>
                      <div>{bill.pay_start_time}</div>
                    </div>
                  </div>
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>
              </div>

              <div>
                <button
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#0B42AB',
                    color: '#FFFFFF',
                  }}
                  onClick={() => html2canvas(document.querySelector("#review")).then(canvas => {
                    const pdf = new jsPDF();
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
                    print({printable: URL.createObjectURL(pdf.output('blob')), type: 'pdf',})
                  })}
                >
                  <PDFSVG style={{ width: '20px', height: '25px' }} /> <span style={{ marginLeft: '8px' }}>In hóa đơn</span>
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {bill && (
        <div style={{ width: '0px', height: '0px', overflow: 'hidden' }}>
          <div style={{ width: '724px', padding: '40px', textAlign: 'center' }} id="review">
            <div style={{ fontWeight: 'bold' }}>TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG</div>
            <div style={{ fontWeight: 'bold' }}>KÝ TÚC XÁ</div>
            <div style={{ width: '100%', height: '20px' }}></div>

            <div style={{ fontWeight: 'bold' }}>THÔNG BÁO</div>
            <div style={{ fontWeight: 'bold' }}>Thu tiền phí sử dụng điện, nước ở ký túc xá - Tháng {(new Date(bill.pay_start_time).getUTCMonth() + 1)}/{(new Date(bill.pay_start_time).getUTCFullYear() + 1)}</div>
            <div style={{ width: '100%', height: '20px' }}></div>

            <div>
              <span style={{ fontWeight: 'bold' }}>Phòng:</span> {bill.room_name}
            </div>
            <div style={{ width: '100%', height: '20px' }}></div>

            <div
              style={{ 
                width: '400px',
                padding: '8px',
                margin: '0px auto',
                border: 'solid #000000 1px', 
              }}
            >
              <div
                style={{
                  display: 'flex',
                }}
              >
                <div style={{ width: '70%', fontWeight: 'bold', }}>Tổng cộng</div>
                <div style={{ width: '30%' }}>{bill.money.total_money}</div>
              </div>

              <div style={{ height: '.8px', margin: '12px 0px', backgroundColor: '#000000' }}></div>

              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <div style={{ display: 'grid', gridTemplateAreas: '"a b" "c d"', gap: '8px 16px', textAlign: 'left' }}>
                  <div>Hạn chót thanh toán</div>
                  <div>{bill.pay_end_time}</div>
                  <div>Ngày xuất hoá đơn</div>
                  <div>{bill.pay_start_time}</div>
                </div>
              </div>
            </div>
            <div style={{ width: '100%', height: '20px' }}></div>
          </div>
        </div> 
      )}

      {printAll && (
        <div style={{ width: '0px', height: '0px', overflow: 'hidden' }}>
          <div id="review-all">
            {bills === null ? <></> : bills.map(({ room_name, price, pay_end_time }, index) => (
              <div style={{ width: '724px', height: '480px',padding: '40px', textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold' }}>TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG</div>
                <div style={{ fontWeight: 'bold' }}>KÝ TÚC XÁ</div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div style={{ fontWeight: 'bold' }}>THÔNG BÁO</div>
                <div style={{ fontWeight: 'bold' }}>Thu tiền phí sử dụng điện, nước ở ký túc xá - Tháng {(new Date(pay_end_time).getUTCMonth() + 1)}/{(new Date(pay_end_time).getUTCFullYear() + 1)}</div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div>
                  <span style={{ fontWeight: 'bold' }}>Phòng:</span> {room_name}
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div
                  style={{ 
                    width: '400px',
                    padding: '8px',
                    margin: '0px auto',
                    border: 'solid #000000 1px', 
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div style={{ width: '70%', fontWeight: 'bold', }}>Tổng cộng</div>
                    <div style={{ width: '30%' }}>{price}</div>
                  </div>

                  <div style={{ height: '.8px', margin: '12px 0px', backgroundColor: '#000000' }}></div>

                  <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <div style={{ display: 'grid', gridTemplateAreas: '"a b" "c d"', gap: '8px 16px', textAlign: 'left' }}>
                      <div>Hạn chót thanh toán</div>
                      <div>{pay_end_time}</div>
                      <div>Ngày xuất hoá đơn</div>
                      <div>{pay_end_time}</div>
                    </div>
                  </div>
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ElectricityWaters;