import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCategory } from 'src/app/common/post-category';
import { PostService } from 'src/app/services/postservice.service';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css']
})
export class ExploreCategoriesComponent implements OnInit {

  constructor(private postService: PostService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  postCategories: PostCategory[] = null!;

  ngOnInit(): void {
    this.handleCategories();
  }

  getAllCategories() {
    this.postService.getPostCategories().subscribe(
      data => { this.postCategories = data }
    );
  }

  getSearchCategories(keyword: string) {
    this.postService.searchCategories(keyword).subscribe(data => { this.postCategories = data })

  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`search/categories/${value}`);
  }

  handleCategories() {
    let previousKeyword;
    let keyword = this.activeRoute.snapshot.paramMap.get("keyword")!;
    let hasKeyword = this.activeRoute.snapshot.paramMap.has("keyword");
    
    
    if(hasKeyword) {
      this.getSearchCategories(keyword);
      previousKeyword = keyword;
    } else {
      this.getAllCategories();
    }

  }

}
