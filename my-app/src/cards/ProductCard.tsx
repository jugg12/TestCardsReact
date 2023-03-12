import React, { useEffect, useState, Suspense } from 'react';
import "./ProductCard.css";
import useSWR from 'swr';
import { Button,Card, CircularProgress } from '@material-ui/core';
import clickInfo from '../functions/clickInfo';
import { Product } from '../interfaces';
import dataFile from "../products.json";
import { fetcher } from '../fetcher';
import scrollLang from '../functions/scrollLang';
import ReactPaginate from 'react-paginate';

export default function ProductCard(){
  const [language,setLanguage] = useState<string>("Ru"); 
  const [currentPage,setCurrentPage] = useState<Product[]>([]); // Данные текущей страницы
  const [CatalogPerPage,setCatalogPerPage]= useState<number>(9); // Кол-во элементов на странице
  const [itemOffset,setItemOffset] = useState<number>(0)
  const [pageCount,setCountPage]= useState<number>(0); // подсчет кол-ва страниц
  const { data, error,isLoading } = useSWR<Product[]>("https://cors-anywhere.herokuapp.com/https://support.stream-labs.com/api/products",fetcher);
  scrollLang(); // функция скрола

  const handlepageclick = (e) =>{ // функция нажатия на пагинационный элемент
    if(!error){ // проверка API
      const newOffset = (e.selected*CatalogPerPage)%data.length;
      setItemOffset(newOffset);
      window.scrollTo({top:0,behavior:"smooth"});
    }
    else{
      const newOffset = (e.selected*CatalogPerPage)%dataFile.length;
      setItemOffset(newOffset);
      window.scrollTo({top:0,behavior:"smooth"});
    }
  }

  useEffect(()=>{
    const endoffset=itemOffset+CatalogPerPage; // подсчет конечного элемента
    if(!error && data!==undefined){
      const lengthData=data.filter(item=>item.isDeleted===false && item.ParentID===null);
      setCurrentPage(lengthData.slice(itemOffset,endoffset)); // вывод на экран элементов, относящихся к странице
      setCountPage(Math.ceil(lengthData.length/CatalogPerPage));
    }
    else{
      const lengthData=dataFile.filter(item=>item.isDeleted===false && item.ParentID===null);
      setCurrentPage(lengthData.slice(itemOffset,endoffset));
      setCountPage(Math.ceil(lengthData.length/CatalogPerPage));
    }
  },[itemOffset,CatalogPerPage]) 

  return(
    <>
      <div className="AllInfo">
        <div className="container">
          <div className="tabs">
            <p className="lang">{language==="Ru"?"Выберите язык":"Choose language"}</p>
            <div className="tabPart">
              <div className={language==="Ru"?"Tab active":"Tab"} onClick={()=>{clickInfo("","Ru"); setLanguage("Ru")}}>
                Rus
              </div>
              <div className={language==="En"?"Tab active":"Tab"} onClick={()=>{clickInfo("","En");setLanguage("En")}}>
                Eng
              </div>
            </div>
          </div>
          <div className="cardLine">
            {
              isLoading?
                <div className='Preloader'>
                  <CircularProgress/>
                </div>
              :(data!==undefined && !error)?
                currentPage.map((item)=>{
                  if(item.isDeleted===false && item.ParentID===null){
                    return(
                      <Card className='card' title={item.Type}>
                        <p className="name">{item.Name}</p>
                        <p className="description">{language==="Ru"?item.descriptionru:item.descriptionen}</p>
                        <Button variant="contained" id={item.ProductID} className='btnShow' onClick={()=>clickInfo(item.ProductID,language)}>
                          {language==="Ru"?"РАЗВЕРНУТЬ":"Show more"}
                        </Button>
                        <div className="moreInfo">
                          {
                            data.map((podItem)=>{
                              if(podItem.ParentID===item.ProductID){
                                return(
                                  <>
                                    <p className="secText">{language==="Ru"?"Наименование под-продукта":"Name of the sub-product"}</p>
                                    <p className="podItemInfo">{podItem.Name}</p>
                                    <p className="secText">{language==="Ru"?"Тип под-продукта":"Type of the sub-product"}</p>
                                    <p className="podItemInfo">{podItem.Type}</p>
                                    <p className="secText">{language==="Ru"?"Описание под-продукта":"Description of the sub-product"}</p>
                                    <p className="podItemInfo podItemInfoLast">{language==="Ru"?podItem.descriptionru:podItem.descriptionen}</p>
                                  </>
                                )
                              }
                            })
                          }
                        </div>
                      </Card>
                    )
                  } 
                })
              :
                currentPage.map((item)=>{
                  if(item.isDeleted===false && item.ParentID===null){
                    return(
                      <Card className='card' title={item.Type}>
                        <p className="name">{item.Name}</p>
                        <p className="description">{language==="Ru"?item.descriptionru:item.descriptionen}</p>
                        <Button variant="contained" id={item.ProductID} className='btnShow' onClick={()=>clickInfo(item.ProductID,language)}>
                          {language==="Ru"?"Развернуть":"Show more"}
                        </Button>
                        <div className="moreInfo">
                          <p className="innerText">{language==="Ru"?"Под-продукты":"Sub-products"}</p>
                          {
                            dataFile.map((podItem)=>{
                              if(podItem.ParentID===item.ProductID){
                                return(
                                  <>
                                  <p className="secText">{language==="Ru"?"Наименование под-продукта":"Name of the sub-product"}</p>
                                    <p className="podItemInfo">{podItem.Name}</p>
                                    <p className="secText">{language==="Ru"?"Тип под-продукта":"Type of the sub-product"}</p>
                                    <p className="podItemInfo">{podItem.Type}</p>
                                    <p className="secText">{language==="Ru"?"Описание под-продукта":"Description of the sub-product"}</p>
                                    <p className="podItemInfo podItemInfoLast">{language==="Ru"?podItem.descriptionru:podItem.descriptionen}</p>
                                  </>
                                )
                              }
                            })
                          }
                        </div>
                      </Card>
                    )
                  } 
                })
              }
            </div>
          <ReactPaginate
            breakLabel={"..."}
            containerClassName="pagination"
            pageRangeDisplayed={7}
            pageClassName="pageItem"
            pageLinkClassName="pageLink"
            activeClassName="pageItem pageItem__active"
            activeLinkClassName="pageLink active"
            pageCount={pageCount}
            onPageChange={handlepageclick}
            previousClassName="previousClass"
            nextClassName="nextClass"
          />
        </div>
      </div>
    </>
  )
}