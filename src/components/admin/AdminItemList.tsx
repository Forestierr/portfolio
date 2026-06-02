import { Edit3, Trash2 } from "lucide-react";

interface AdminItemListProps<T> {
	title: string;
	items: T[];
	renderTitle: (item: T) => string;
	renderDate: (item: T) => string;
	isDraft: (item: T) => boolean;
	onEdit: (item: T) => void;
	onDelete: (id: string) => void;
	getId: (item: T) => string;
}

function AdminItemList<T>({
	title,
	items,
	renderTitle,
	renderDate,
	isDraft,
	onEdit,
	onDelete,
	getId,
}: AdminItemListProps<T>) {
	return (
		<section className="space-y-4">
			<h2 className="text-sm font-bold uppercase tracking-widest border-b border-white/40 pb-2">
				{title}
			</h2>
			<div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 text-sm">
				{items.map((item) => (
					<div
						key={getId(item)}
						className="border border-white/20 p-3 hover:border-white group flex justify-between items-center"
					>
						<div className="truncate">
							<div className="flex items-center gap-2 text-xs font-bold uppercase">
								{isDraft(item) && (
									<span className="bg-white text-black text-[8px] px-1">
										DRAFT
									</span>
								)}
								{renderTitle(item)}
							</div>
							<div className="text-[10px] text-gray-500">
								{renderDate(item)}
							</div>
						</div>
						<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
							<button
								type="button"
								onClick={() => onEdit(item)}
								className="p-1 hover:bg-white hover:text-black"
							>
								<Edit3 size={14} />
							</button>
							<button
								type="button"
								onClick={() => onDelete(getId(item))}
								className="p-1 hover:bg-red-500 hover:text-white"
							>
								<Trash2 size={14} />
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default AdminItemList;
